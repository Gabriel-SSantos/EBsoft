import style from './cadastros.module.css'
import { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'

const salvar=({nome,nivel,genero,i})=>{
    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || []
    jogadores[i].nome = nome
    jogadores[i].genero = genero
    jogadores[i].nivel = nivel
    localStorage.setItem('jogadores',JSON.stringify(jogadores))
}

export default function EditCadastro({editavel,i}){
    const [nome,setNome] = useState("")
    const [genero,setGenero] = useState("")
    const [nivel,setNivel] = useState(5)
    
    
    useEffect(()=>{
        let jogadores = JSON.parse(localStorage.getItem('jogadores')) || []
        setNome(jogadores[i].nome)
        setGenero(jogadores[i].genero)
        setNivel(jogadores[i].nivel)
    },[])

    console.log("Nome: ",nome)
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    const mudancaEstadoNivel = (e)=>{
        setNivel(e.target.value)
    }
    const mudancaEstadoGenero = (e)=>{
        setGenero(e.target.value)
    }

    console.log(`Nome:${nome}, genero: ${genero}, nivel${nivel}`)

    return(
    <div className={`${style.cad_box}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para fazer o cadastro</p><BiX size={30} onClick={editavel}/></div>
        
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
                checked={genero=="M"? true:false} 
                onChange={mudancaEstadoGenero}
            /> 
            <p>Feminino </p><input 
                value={"F"}
                type='radio' 
                name='genero'
                checked={genero=="F"? true:false} 
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
                editavel()
                salvar({nome:nome,genero:genero,nivel:nivel,i})
            }}
        >Salvar</button>
    </div>
    )
}


