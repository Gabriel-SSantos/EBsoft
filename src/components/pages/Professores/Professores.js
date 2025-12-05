import { BiPlus } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./alunos.module.css"
import { useEffect, useState } from "react"
import { FormProfessor } from "../../Forms/Cadastro"
import { getDocCollection, getItens } from "../../../firebase/CRUD"
import { FichaProfessor } from "../../layout/Fichas"

export default function Professors(){

    const [Professores,setProfessores] = useState([])
    const [cadastramento,setCadastramento] = useState(false)

    useEffect(()=>{
        return getItens("professores",setProfessores)
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
                <h2>Professores</h2>
            </div>
            <div>
                <BotaoCadastro 
                    cadastramento={ativarCadastramento}
                    texto={"Cadastrar Novo Professor"}
                />
            </div>
            {cadastramento && <FormProfessor cadastramento={desativarCadastramento}/>}
            {
                // console.log(Professors.length)
                Professores.length == 0 
                && <p>Carregando Professores...</p>
            }
            {Professores.length > 0 && 
                Professores.map((item,id)=>
                    <FichaProfessor
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