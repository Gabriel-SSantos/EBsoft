import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"

import style from './styles/user.module.css'
import { BiUserCircle } from "react-icons/bi"
import { getAuth, signOut } from "firebase/auth"
export default function UserPage(){
    const {usuario} = useAuth()
    const navigate = useNavigate()

    const logout= async ()=>{
        const auth = getAuth()
        await signOut(auth);
        navigate('/login',{replace:true})
    }
    return(
        <div className={`${style.box}`}>
            <div className={`${style.perfil}`}>
                <BiUserCircle size={70}/>
                <p>{usuario?.nome}</p>
                <p>Função: {usuario?.perfil == "prof" ? "Professor":"Diretor/Secretário"}</p>
            </div>
            <div className={`${style.botoes}`}>
                <div><p
                    onClick={()=>{logout()}}
                >Sair</p></div>
                <div><p>Alterar Senha</p></div>
            </div>
        </div>
    )
}