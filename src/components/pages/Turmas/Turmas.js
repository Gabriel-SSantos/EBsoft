import { BiPlus } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./turmas.module.css"
import { useEffect, useState } from "react"
import FormTurma from "../../Forms/Cadastro"
import { getDocCollection, getItens } from "../../../firebase/CRUD"
import { FichaTurma } from "../../layout/Fichas"

export default function Turmas(){

    const [turmas,setTurmas] = useState([])
    const [cadastramento,setCadastramento] = useState(false)
    const preencherLista = (dados)=>{
        setTurmas(dados)
    }

    useEffect(()=>{
        return getItens("turmas",setTurmas)
    },[])

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
            <div>
                <BotaoCadastro 
                    cadastramento={ativarCadastramento}
                    texto={"Cadastrar Nova Turma"}
                />
            </div>
            {cadastramento && <FormTurma cadastramento={desativarCadastramento}/>}
            {
                // console.log(turmas.length)
                turmas.length == 0 
                && <p>Carregando turmas...</p>
            }
            {turmas.length > 0 && 
                turmas.map((item,id)=>
                    <FichaTurma 
                        key={id}   
                        nomeTurma={item.nome}
                        descricaoTurma={item.descricao}
                        />
                )
            }
        </div>
    )
}