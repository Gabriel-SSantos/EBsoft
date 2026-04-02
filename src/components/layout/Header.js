import { useAuth } from '../../hooks/AuthContext'
import logo from '../../img/logo.png'
import { BiUser } from 'react-icons/bi'
import { BiUserCircle } from 'react-icons/bi'
import style from './styles/header.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import UserPage from './UserPage'
export default function Header(){
    const {usuario} = useAuth()
    const navigate = useNavigate()
    const [verPerfil,setVerPerfil] = useState(false)
    const menuRef = useRef(null)

    useEffect(()=>{
        const clicarFora = (e)=>{
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setVerPerfil(false)
            }
        }
        document.addEventListener('mousedown',clicarFora)
        return ()=> document.removeEventListener('mousedown',clicarFora)
    },[])

    return(
        <div className={`${style.head}`}>
            <div className={`${style.logo}`}
                onClick={()=>{navigate('/',{replace:true})}}
            ><img src={logo} width={"15%"}></img> <p>EBD Chamada</p></div>

            <div ref={menuRef} className={`${style.containerPerfil}`}>
                <div className={`${style.perfil}`}
                    onClick={()=>{
                        setVerPerfil(!verPerfil)
                    }}
                ><p>{usuario?.nome}</p><BiUserCircle size={30}/></div>
                {verPerfil && <UserPage/>}
            </div> 
           
        </div>
    )
}
