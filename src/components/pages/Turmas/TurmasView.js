import { BiPlus } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./turmas.module.css"
import { useEffect, useState } from "react"
import FormTurma from "../../Forms/Cadastro"
import { getDocumentoUnico, filtro } from "../../../firebase/CRUD"
import { FichaAluno } from "../../layout/Fichas"
import { useParams } from "react-router-dom"

export default function TurmasView(){

    const [turmaInfo,setTurmaInfo] = useState({})
    const [alunos, setAlunos] = useState([])
    const [cadastramento,setCadastramento] = useState(false)
    const {id} = useParams()

    useEffect(()=>{
        getDocumentoUnico("turmas",id,setTurmaInfo)
        filtro("alunos","turma",id,setAlunos)
    },[])

    console.log(turmaInfo)
    const ativarCadastramento = ()=>{
        setCadastramento(true)
    }
    const desativarCadastramento = ()=>{
        setCadastramento(false)
    }

    return(
        <div className={`${style.container}`}>
            <div className={`${style.cabecalho}`}>
                {!turmaInfo.nome 
                    && <h3>Carregando turma...</h3>
                }
                {turmaInfo.nome  
                    && <h3>Turma {turmaInfo.nome}</h3>
                }
            </div>
            <div className={`${style.descricao}`}>
                {turmaInfo.descricao && 
                    <div>
                        <p>Professores: {turmaInfo.professor}</p>
                        <p>Matriculados: {turmaInfo.alunos.length}</p>
                        <p>Descrição: {turmaInfo.descricao}</p>
                        {console.log(alunos[0])}
                    </div>
                }
            </div>
            
            <div>
            {alunos.length > 0 && 
                alunos.map((item,id)=>
                    
                    <FichaAluno 
                        key={id}
                        id={item.id}   
                        nome={item.nome}
                        turma={turmaInfo.nome}
                    />
                )
            }
            </div>
            
        </div>
    )
}