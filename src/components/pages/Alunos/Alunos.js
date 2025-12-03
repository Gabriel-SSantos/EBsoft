import { BiPlus } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./alunos.module.css"
import { useEffect, useState } from "react"
import { FormAluno } from "../../Forms/Cadastro"
import { getDocCollection, getItens } from "../../../firebase/CRUD"
import { FichaAluno } from "../../layout/Fichas"

export default function Alunos(){

    const [Alunos,setAlunos] = useState([])
    const [cadastramento,setCadastramento] = useState(false)

    useEffect(()=>{
        return getItens("alunos",setAlunos)
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
                <h2>Alunos</h2>
            </div>
            <div>
                <BotaoCadastro 
                    cadastramento={ativarCadastramento}
                    texto={"Cadastrar Nova Alunos"}
                />
            </div>
            {cadastramento && <FormAluno cadastramento={desativarCadastramento}/>}
            {
                // console.log(Alunos.length)
                Alunos.length == 0 
                && <p>Carregando Alunos...</p>
            }
            {Alunos.length > 0 && 
                Alunos.map((item,id)=>
                    <FichaAluno
                        key={id}
                        id={item.id}   
                        nome={item.nome}
                        turma={item.turmaNome}
                    />
                )
            }
        </div>
    )
}