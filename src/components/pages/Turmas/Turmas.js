import { BiPlus } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./turmas.module.css"
import { useEffect, useState } from "react"
import FormTurma from "../../Forms/Cadastro"
import { getDocCollection, getItens } from "../../../firebase/CRUD"
import { FichaTurma } from "../../layout/Fichas"
import { useAuth } from "../../../hooks/AuthContext"

export default function Turmas(){
    const {usuario} = useAuth()
    const [turmas,setTurmas] = useState([])
    const [cadastramento,setCadastramento] = useState(false)

    useEffect(()=>{
        return getItens("turmas",setTurmas,usuario.idEscola)
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
                turmas.length == 0 
                && <p>Carregando turmas...</p>
            }
            {turmas.length > 0 && 
                turmas.map((item,id)=>
                    <FichaTurma 
                        key={id}
                        id={item.id}   
                        nomeTurma={item.nome}
                        descricaoTurma={item.descricao}
                    />
                )
            }
        </div>
    )
}