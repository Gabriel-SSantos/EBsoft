import { BiPlus } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./turmas.module.css"
import { useEffect, useState } from "react"
import FormTurma from "../../Forms/Cadastro"

export default function Turmas(){

    const [turmas,setTurmas] = useState([])
    const [cadastramento,setCadastramento] = useState(false)

    useEffect(()=>{
        const Lista = JSON.parse(localStorage.getItem('turmas'))
        setTurmas(Lista)
    },[cadastramento])

    const ativarCadastramento = ()=>{
        setCadastramento(true)
    }
    const desativarCadastramento = ()=>{
        setCadastramento(false)
    }
    
    return(
        <div className={`${style.container}`}>
            <div style={{width: "100%"}}>
                <h2>Turmas</h2>
            </div>


            {cadastramento && <FormTurma cadastramento={desativarCadastramento}/>}

            <div>
                <BotaoCadastro 
                    cadastramento={ativarCadastramento}
                    texto={"Cadastrar Nova Turma"}
                />
            </div>
        </div>
    )
}