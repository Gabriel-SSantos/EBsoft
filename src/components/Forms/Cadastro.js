import style from './cadastros.module.css'
import { useState } from 'react'
import { BiX } from 'react-icons/bi'
import {addItem } from "../../firebase/CRUD"
import { getItens } from '../../firebase/CRUD'

const salvar=({localstore,item})=>{
    // let lista = ""
    // const salve = JSON.parse(localStorage.getItem(`${localstore}`)) || []
    // salve.push(item)
    // localStorage.setItem(`${localstore}`,JSON.stringify(salve))
    addItem(localstore,item)
}

export const FormAluno=({cadastramento})=>{
    const [nome,setNome] = useState("")
    const [genero,setGenero] = useState("")
    const [dataNascimento, setDataNascimento] = useState(Date)
    const [turma,setTurma] = useState("")
    
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    const mudancaEstadoTurma = (e)=>{
        setTurma(e.target.value)
    }
    const mudancaEstadoNascimento = (e)=>{
        setDataNascimento(e.target.value)
    }
    const mudancaEstadoGenero = (e)=>{
        setGenero(e.target.value)
    }

    return(
    <div className={`${style.cad_box}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para realizar a matrícula</p><BiX size={30} onClick={cadastramento}/></div>
        
        <div><p>Nome: </p><input 
            type='text'
            value={nome}
            onChange={mudancaEstadoNome}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"100%"}}
        ><p>Gênero:</p><p style={{marginLeft:"4px"}}>Masculino</p><input 
                value={"M"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /> 
            <p>Feminino </p><input 
                value={"F"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /></div>
        <div>
            <input
                type='date'
                value={dataNascimento}
                onChange={mudancaEstadoNascimento}
            />
        </div>
        <div><p>Turma: </p><input 
            type='text'
            value={turma}
            onChange={mudancaEstadoTurma}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                cadastramento()
                const aluno = {
                    nome:nome,
                    genero:genero,
                    nascimento: dataNascimento,
                    turma: turma
                }
                salvar({
                    item:aluno,
                    localstore:"alunos"
                })}}
        >Salvar</button>
    </div>
    )
}

export const FormProfessor=({cadastramento})=>{
    const [nome,setNome] = useState("")
    const [genero,setGenero] = useState("")
    const [dataNascimento, setDataNascimento] = useState(Date)
    const [turma,setTurma] = useState("")
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    const mudancaEstadoTurma = (e)=>{
        setTurma(e.target.value)
    }
    const mudancaEstadoSenha = (e)=>{
        setSenha(e.target.value)
    }
    const mudancaEstadoEmail = (e)=>{
        setEmail(e.target.value)
    }
    const mudancaEstadoNascimento = (e)=>{
        setDataNascimento(e.target.value)
    }
    const mudancaEstadoGenero = (e)=>{
        setGenero(e.target.value)
    }

    return(
    <div className={`${style.cad_box}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para realizar a matrícula</p><BiX size={30} onClick={cadastramento}/></div>
        
        <div><p>Nome: </p><input 
            type='text'
            value={nome}
            onChange={mudancaEstadoNome}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"100%"}}
        ><p>Gênero:</p><p style={{marginLeft:"4px"}}>Masculino</p><input 
                value={"M"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /> 
            <p>Feminino </p><input 
                value={"F"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /></div>
        <div>
            <input
                type='date'
                value={dataNascimento}
                onChange={mudancaEstadoNascimento}
            />
        </div>
        <div><p>Turma: </p><input 
            type='text'
            value={turma}
            onChange={mudancaEstadoTurma}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        <div><p>Email: </p><input 
            type='email'
            value={email}
            onChange={mudancaEstadoEmail}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        <div><p>Senha: </p><input 
            type='password'
            value={senha}
            onChange={mudancaEstadoSenha}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
               
                cadastramento()
                const professor = {
                    nome:nome,
                    genero:genero,
                    nascimento: dataNascimento,
                    turma: turma,
                    email:email,
                    senha:senha,
                }
                salvar({
                    item:professor,
                    localstore:"professores"
                })}}
        >Salvar</button>
    </div>
    )
}

export default function FormTurma({cadastramento}){
    const [nome,setNome] = useState("")
    const [descricao,setDescricao] = useState("")

    const mudancaEstadoDescricao = (e)=>{
        setDescricao(e.target.value)
    }
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    return(
    <div className={`${style.cad_box}`}>
        <div>
            <div style={{margin:"0", display:"flex",justifyContent:"flex-end"}}>
                <BiX size={30} onClick={cadastramento}/>
            </div>
            <div style={{marginTop:"0", textAlign:"center"}}>
                <p>Faça o cadastro de uma nova turma</p>
            </div>
        </div>
        <div className={`${style.formSection}`}>
            <div>
                <p>Nome: </p>
                <input 
                    placeholder='Insira o Nome da Turma'
                    type='text'
                    value={nome}
                    onChange={mudancaEstadoNome}
                />
            </div><div>
                <p>Descrição: </p>
                <input 
                    placeholder='Insira o Nome da Turma'
                    type='text'
                    value={descricao}
                    onChange={mudancaEstadoDescricao}
                />
            </div>

            <div style={{display:"flex",justifyContent:"center"}}>
                <button type='button'
                    
                    onClick={()=>{
                        if(nome.length < 1){
                            alert("Preencha o nome")
                            return
                        }
                        const turma = {nome:nome,descricao:descricao}
                        cadastramento()
                        // addItem("turmas",turma)
                        salvar({
                            localstore:"turmas",
                            item:turma,
                        })
                    }}
                >Salvar</button>
            </div>
        </div>
    </div>
    )
}

