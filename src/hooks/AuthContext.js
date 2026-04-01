import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { createContext, useEffect, useState, useContext } from "react";

//Guardar dados
const AuthContext = createContext()

//Função que vai envelopar a aplicação
export function AuthProvider({children}){
    const [usuario,setUsuario] = useState(null)

    //Ganha tempo enquanto o firebase carrega
    const [carregando, setCarregando] = useState(true)

    useEffect(()=>{
        const auth = getAuth()

        //verifica a mudança de estado do login
        const unsubscribe = onAuthStateChanged(auth, async (userFirebase)=>{
            if(userFirebase){
                try{
                    const docRef = doc(db, "usuarios",userFirebase.uid)
                    const docSnap = await getDoc(docRef)
                    if(docSnap.exists()){
                        const dadosFirestore = docSnap.data()
                        setUsuario({
                            uid: userFirebase.uid,
                            email: userFirebase.email,
                            ...dadosFirestore
                        })
                    } else {
                        console.error("Autenticado, mas sem documento na coleção 'usuarios'.");
                        setUsuario(null);
                    }
                } catch(error){
                    console.log("Erro ao buscar dados")
                    setUsuario(null)
                }
            } else {
                // quando o user faz logout
                setUsuario(null)
            }
            setCarregando(false)
        })
        return ()=> unsubscribe()
    },[])

    return (
    // Tudo o que passarmos no 'value' ficará acessível em qualquer parte do site
    <AuthContext.Provider value={{ usuario, carregando }}>
      {/* Se ainda estiver a verificar o Firebase, não desenhamos as telas, 
          apenas mostramos um aviso de carregamento. */}
      {carregando ? (
        <div>
           <p>A carregar o sistema...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
export const useAuth=()=>{
    return useContext(AuthContext)
}