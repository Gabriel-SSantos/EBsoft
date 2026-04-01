import { useState } from 'react'
import style from './login.module.css'
import { registarDiretorEscola } from '../../../firebase/CRUD'
import { useNavigate } from 'react-router-dom'
export default function FormCadastro(){

    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [igreja,setIgreja] = useState('')
    const [nome,setNome] = useState('')
    const [telefone,setTelefone] = useState('')
    const navigate = useNavigate()
    const onChageEmail = (e)=>{
        setEmail(e.target.value)
    }
    const onChageSenha = (e)=>{
        setSenha(e.target.value)
    }
    const onChangeNome = (e)=>{
        setNome(e.target.value)
    }
    const onChangeTelefone = (e)=>{
        setTelefone(e.target.value)
    }
     const onChangeIgreja = (e)=>{
        setIgreja(e.target.value)
    }
    const cadastrar = async (diretor,email,senha,nomeIgreja)=>{
        
        await registarDiretorEscola(diretor,email,senha,nomeIgreja)
        navigate(-1)
    }
    return(
        <div className={`${style.form}`}>
            <label> Nome
                <input
                    type="text"
                    placeholder='Seu nome'
                    value={nome}
                    onChange={onChangeNome}
                 />
            </label>
            <label>
                Telefone
                <input 
                    type="tel"
                    placeholder='Seu telefone'
                    value={telefone}
                    onChange={onChangeTelefone}
                />
            </label>
            <label>
                Email
                <input 
                    type="email"
                    placeholder='Seu email'
                    value={email}
                    onChange={onChageEmail}
                />
            </label>
            <label>
                Senha
                <input 
                    type="password"
                    placeholder='Digite sua senha'
                    value={senha}
                    onChange={onChageSenha}
                />
            </label>
             <label>
                Igreja
                <input 
                    type="text"
                    placeholder='Nome da Igreja/Congregação'
                    value={igreja}
                    onChange={onChangeIgreja}
                />
            </label>
            <div
                className={`${style.botao}`}
                onClick={()=>{
                    console.log(nome.length)
                    if(nome.length < 1 || email.length < 1 || senha.length < 1 || igreja.length < 1){
                        alert("Preencha todos os dados")
                        return
                    }
                    let diretor = {
                        nome: nome,
                        telefone: telefone,
                    }
                    cadastrar(diretor,email,senha,igreja)
                }
            }>
                <p>Cadastrar</p>
            </div>
            
        </div>
    )
}