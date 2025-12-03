import { 
    collection, 
    doc, 
    addDoc, 
    getDocs, 
    getDoc,
    onSnapshot, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy,
    serverTimestamp 
} from "firebase/firestore";

import {db} from "./firebase"

export async function addItem(collectionName, data){
    try{
        const docRef = await addDoc(collection(db,collectionName),{
            ...data,
            createdAt:serverTimestamp()
        });
        console.log("Documento criado com o id", docRef.id)
        return docRef.id
    } catch (error){
        console.log("Erro ao criar documento", error)
        throw error;
    }
}

//Busca pela colecao e atualiza sempre que ela mudar, ideal para dados que são atualizados por outros usuários

export function getItens(collectionName, callback){
    const q = query(collection(db,collectionName),orderBy("createdAt","desc"))

    const unsubscribe = onSnapshot(q,(snapshot)=>{
        const items = snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }));
        // console.log(items)
        callback(items); //Envia os dados para o componente React
    })
    return unsubscribe; //Retorna função de limpeza 
} 

/**
 * Busca todos os documentos de uma coleção uma única vez.
 * Ideal para dados de consulta ou lista, dados que não precisam de respostas imediatas 
 */
export async function getDocCollection(collectionName,callback){
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const dados = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(dados)
    return;
};

export async function getDocumentoUnico(collectionName,id,callback){
  try{
    const docRef = doc(db,collectionName,id)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      callback({id: docSnap.id, 
        ...docSnap.data()})
      return 
    } else {
        console.log("Documento não encontrado!");
        return null
      }
      // console.log()
    } catch (error){
      console.error("Erro ao buscar elemento", error)
      throw error;
    }
}

/**
 * Atualiza campos específicos de um documento existente.
 * @param {string} collectionName - Nome da coleção.
 * @param {string} docId - ID do documento a ser atualizado.
 * @param {object} data - Objeto contendo APENAS os campos a alterar.
 */
export async function updateItem(collectionName, docId, data){
    try {
      // Cria a referência para o documento específico
      const docRef = doc(db, collectionName, docId);
      
      // Atualiza
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp() // Boa prática: marcar quando foi editado
      });
      console.log("Documento atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      throw error;
    }
  };

/**
 * Remove um documento permanentemente.
 * @param {string} collectionName - Nome da coleção.
 * @param {string} docId - ID do documento a ser removido.
 */
export async function deleteItem(collectionName, docId){
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      console.log("Documento removido");
    } catch (error) {
      console.error("Erro ao remover:", error);
      throw error;
    }
  };

export async function filtro(collectionName,campo,parametros,callback){
  try{
    const q = query(collection(db,collectionName), where(campo,"==",parametros))
    const querySnapshot = await getDocs(q)
    const dados = querySnapshot.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    }))
    console.log(dados)
    callback(dados)
    return;
  }catch(error){
    console.error("Erro ao buscar: ", error);
      throw error;
  }
}