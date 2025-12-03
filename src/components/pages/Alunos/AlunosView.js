import { BiPlus } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./alunos.module.css"
import { useEffect, useState } from "react"
import FormAluno from "../../Forms/Cadastro"
import { getDocumentoUnico, getItens } from "../../../firebase/CRUD"
import { FichaAluno } from "../../layout/Fichas"
import { useParams } from "react-router-dom"

export default function AlunosView(){

    const [AlunoInfo,setAlunoInfo] = useState({})
    const [cadastramento,setCadastramento] = useState(false)
    const {id} = useParams()

    useEffect(()=>{
        getDocumentoUnico("Alunos",id,setAlunoInfo)
    },[])

    console.log(AlunoInfo)
    const ativarCadastramento = ()=>{
        setCadastramento(true)
    }
    const desativarCadastramento = ()=>{
        setCadastramento(false)
    }

    return(
        <div className={`${style.container}`}>
            <div className={`${style.cabecalho}`}>
                {!AlunoInfo.nome 
                    && <h3>Carregando Aluno...</h3>
                }
                {AlunoInfo.nome  
                    && <h3>Aluno {AlunoInfo.nome}</h3>
                }
            </div>
            <div className={`${style.descricao}`}>
                {AlunoInfo.descricao && 
                    <div>
                        <p>Professores: {AlunoInfo.professor}</p>
                        <p>Matriculados: {AlunoInfo.alunos.length}</p>
                        <p>Descrição: {AlunoInfo.descricao}</p>
                    </div>
                }
            </div>
            
            <div>
               
            </div>
            
        </div>
    )
}