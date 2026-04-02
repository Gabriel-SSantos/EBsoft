import { BiPencil } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "./alunos.module.css"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import {FormAluno} from "../../Forms/Cadastro"
import { getDocumentoUnico, getItens } from "../../../firebase/CRUD"
import { FichaAluno } from "../../layout/Fichas"
import { useParams } from "react-router-dom"
import BackButton from '../../layout/BackButton'
export default function AlunosView(){

    const [AlunoInfo,setAlunoInfo] = useState({})
    const [cadastramento,setCadastramento] = useState(false)
    const [historico,setHistorico] = useState({})
    const {id} = useParams()
    const location = useLocation()
    const aluno = location.state
    console.log(aluno)
    useEffect(()=>{
        // getDocumentoUnico("alunos",id,setAlunoInfo)
        let hist = {
            biblias: aluno.historico.biblias.reduce((acumulador, valorAtual)=>acumulador + valorAtual,0),
            revistas: aluno.historico.revista.reduce((acumulador, valorAtual)=>acumulador + valorAtual,0),
            pontos: aluno.historico.pontos.reduce((acumulador, valorAtual)=>acumulador + valorAtual,0),
            presencas: aluno.historico.presenca.reduce((acumulador, valorAtual)=>acumulador + valorAtual,0),
        }
        setHistorico(hist)
        setAlunoInfo(aluno)

    },[cadastramento])

    console.log(AlunoInfo)
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
                        size={30}/>
                </div>
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
                        <p>Total Bíblias: {historico.biblias}</p>
                        <p>Total Revistas: {historico.revistas}</p>
                        <p>Pontos acumulados: {historico.pontos}</p>
                        <p>Frequência: {historico.presencas}</p>
                        {/* <p>Status: {historico.presencas}</p> */}
                    </div>
                }
            </div>
            
            <div>
               
            </div>
            
        </div>
    )
}