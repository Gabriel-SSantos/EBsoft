import style from './cadastros.module.css'
import { useState } from 'react'
import { BiX } from 'react-icons/bi'

export const BotaoCadastro=({cadastramento})=>{
    return(
        <div 
            onClick={cadastramento}
            className={`${style.botao}`}>
            <p>Adicionar Novo</p>
        </div>
    )
}

const salvar=({localstore,aluno})=>{
    const alunos = JSON.parse(localStorage.getItem(`${localstore}`)) || []
    alunos.push(aluno)
    localStorage.setItem(`${localstore}`,JSON.stringify(alunos))
}

export default function AddCadastro({cadastramento}){
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
                const aluno = {nome:nome,
                    genero:genero,
                    turma: turma,
                    nascimento: dataNascimento}
                salvar({
                    aluno:aluno,
                    localstore:"alunos",
                })}}
        >Salvar</button>
    </div>
    )
}


