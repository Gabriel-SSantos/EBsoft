import { BiPlus } from "react-icons/bi"
import { BiPencil } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./turmas.module.css"
import { useEffect, useState } from "react"
import FormTurma from "../../Forms/Cadastro"
import { getDocumentoUnico, filtro } from "../../../firebase/CRUD"
import { FichaAluno } from "../../layout/Fichas"
import { useParams } from "react-router-dom"
import BackButton from '../../layout/BackButton'
import { useAuth } from "../../../hooks/AuthContext"
export default function TurmasView(){

    const [turmaInfo,setTurmaInfo] = useState({})
    const [alunos, setAlunos] = useState([])
    const [professores,setProfessores] = useState([])
    const [cadastramento,setCadastramento] = useState(false)
    const {id} = useParams()
    const {usuario} = useAuth()
    useEffect(()=>{
        getDocumentoUnico("turmas",id,setTurmaInfo,usuario.idEscola)
        filtro("alunos","turma","==",id,setAlunos,usuario.idEscola)
        filtro("professores","turma","==",id,setProfessores,usuario.idEscola)
        console.log(professores)
    },[])

    console.log(turmaInfo)
    const ativarCadastramento = ()=>{
        setCadastramento(true)
    }
    const desativarCadastramento = ()=>{
        setCadastramento(false)
    }

    return(
        <div className={`${style.view}`}>
            <div className={`${style.cabecalho}`}>
                <div style={{
                    display:"flex",
                    width:"90%",
                    justifyContent:"space-between"
                }}>
                    <BackButton/>
                    <BiPencil
                    onClick={
                       ativarCadastramento
                    }
                    size={30}/></div>
               {!turmaInfo.nome 
                    && <h3>Carregando turma...</h3>
                }
                {turmaInfo.nome  
                    && <h3>Turma {turmaInfo.nome}</h3>
                }
            </div>
            <div className={`${style.conteudoView}`}>
                <div className={`${style.descricao}`}>
                    {turmaInfo.descricao && 
                        <div>
                            <p>Professores:  
                            {professores.length > 0 && 
                                professores.map((item,id)=>
                                <spam 
                                    key={id}
                                > {item.nome};</spam>
                            )
                        }
                            </p>
                            <p>Matriculados: {alunos.length}</p>
                            <p>Descrição: {turmaInfo.descricao}</p>
                        </div>
                    }
                </div>
                {cadastramento && <FormTurma cadastramento={desativarCadastramento} edit={turmaInfo}/>}
                <div className={`${style.ficha}`}>
                    {alunos.length > 0 && 
                        alunos.map((item,id)=>
                            
                            <FichaAluno 
                                key={id}
                                id={item.id}   
                                nome={item.nome}
                                turma={`Pontos: ${item.pontos}`}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}