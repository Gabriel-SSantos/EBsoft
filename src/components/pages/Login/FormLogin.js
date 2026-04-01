import { useState } from 'react'
import style from './login.module.css'
import { useNavigate } from 'react-router-dom'
import { verificarLogin } from '../../../firebase/CRUD'
export default function FormLogin(){

    const [email,setEmail] = useState()
    const [senha,setSenha] = useState()
    const [usuario,setUsuario] = useState()
    const navigate = useNavigate()
    const onChageEmail = (e)=>{
        setEmail(e.target.value)
    }
    const onChageSenha = (e)=>{
        setSenha(e.target.value)
    }
    const checarDadosDeCadastro =(dados)=>{
        const verificar=(doc)=>{
            console.log(doc)
            if(doc.id){
                navigate('/')
            }
        }
        verificarLogin(dados.email,dados.senha,verificar)

    }
    
    return(
        <div className={`${style.form}`}>
            <label> 
                <input
                    type="email"
                    placeholder='Digite seu e-mail'
                    value={email}
                    onChange={onChageEmail}
                 />
            </label>
            <label>
                <input 
                    type="password"
                    placeholder='Digite sua senha'
                    value={senha}
                    onChange={onChageSenha}
                />
            </label>
            <div
                onClick={()=>checarDadosDeCadastro({email:email,senha:senha})}
                className={`${style.botao}`}
            >
                <p>Entrar</p>
            </div>
            {console.log(usuario)}
            <div className={`${style.Cad}`}>
                <span>Não tem conta?</span>
                <div
                    onClick={()=>navigate('/cadastro')}
                    className={`${style.botaoCad}`}
                >
                    <p>Cadastrar</p>
                </div>
            </div>
        </div>
    )
}