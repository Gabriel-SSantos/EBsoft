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

const salvar=({nome,nivel,genero})=>{
    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || []
    jogadores.push({nome:nome,nivel:nivel,genero:genero})
    localStorage.setItem('jogadores',JSON.stringify(jogadores))
}

export default function AddCadastro({cadastramento}){
    const [nome,setNome] = useState("")
    const [genero,setGenero] = useState("")
    const [nivel,setNivel] = useState(5)
    
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    const mudancaEstadoNivel = (e)=>{
        setNivel(e.target.value)
    }
    const mudancaEstadoGenero = (e)=>{
        setGenero(e.target.value)
    }

    return(
    <div className={`${style.cad_box}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para fazer o cadastro</p><BiX size={30} onClick={cadastramento}/></div>
        
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
        <div><span>Nível de habilidade </span> 
            <input 
                type='number'
                value={nivel}
                onChange={mudancaEstadoNivel}
                style={{width:"100px"}}
            /><br/><span style={{color:"red",fontSize:"15px"}}>*Caso desconhecida, colocar 5</span></div>
        
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                cadastramento()
                salvar({nome:nome,genero:genero,nivel:nivel})}}
        >Salvar</button>
    </div>
    )
}


