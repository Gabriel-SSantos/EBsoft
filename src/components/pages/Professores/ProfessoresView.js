import { BiPencil } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./alunos.module.css"
import { useEffect, useState } from "react"
import {FormAluno} from "../../Forms/Cadastro"
import { getDocumentoUnico, getItens } from "../../../firebase/CRUD"
import { FichaAluno } from "../../layout/Fichas"
import { useParams } from "react-router-dom"
import BackButton from '../../layout/BackButton'
export default function AlunosView(){

    const [AlunoInfo,setAlunoInfo] = useState({})
    const [cadastramento,setCadastramento] = useState(false)
    const {id} = useParams()

    useEffect(()=>{
        getDocumentoUnico("alunos",id,setAlunoInfo)
    },[cadastramento])

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
                {!AlunoInfo.nome 
                    && <h3>Carregando Aluno...</h3>
                }
                {AlunoInfo.nome  
                    && <h3>Aluno {AlunoInfo.nome}</h3>
                }
            </div>
            {cadastramento && <FormAluno cadastramento={desativarCadastramento} edit={AlunoInfo}/>}
            <div className={`${style.descricao}`}>
                {AlunoInfo.nome && 
                    <div>
                        <h3>Dados cadastrais</h3>
                        <p>Nome: {AlunoInfo.nome}</p>
                        <p>Data de nascimento: {AlunoInfo.nascimento}</p>
                        <p>Gênero: {AlunoInfo.genero}</p>

                        <h3>Dados da EBD</h3>

                        <p>Turma: {AlunoInfo.turmaNome}</p>
                        <p>Dias presentes: {AlunoInfo.presencas}</p>
                        <p>Pontos acumulados: {AlunoInfo.pontos}</p>
                        <p>Frequência: {AlunoInfo.presencas}</p>
                        <p>Status: {AlunoInfo.presencas}</p>
                        
                    </div>
                }
            </div>
            
            <div>
               
            </div>
            
        </div>
    )
}