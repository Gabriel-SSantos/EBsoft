import { BiPencil } from "react-icons/bi"
import BotaoCadastro from "../../Forms/BotaoCadastro"
import style from "../Alunos/alunos.module.css"
import { useEffect, useState } from "react"
import {FormProfessor} from "../../Forms/Cadastro"
import { getDocumentoUnico, getItens } from "../../../firebase/CRUD"
import { FichaAluno } from "../../layout/Fichas"
import { useParams } from "react-router-dom"
import BackButton from '../../layout/BackButton'
import { useAuth } from "../../../hooks/AuthContext"
export default function ProfessoresView(){
    const {usuario} = useAuth()
    const [AlunoInfo,setAlunoInfo] = useState({})
    const [cadastramento,setCadastramento] = useState(false)
    const [historico,setHistorico] = useState()
    const {id} = useParams()

    useEffect(()=>{
       
        const pegarHistorico = (aluno)=>{
            let hist = {
                biblias: aluno.historico.biblias.reduce((acumulador, valorAtual)=>acumulador + valorAtual,0),
                revistas: aluno.historico.revista.reduce((acumulador, valorAtual)=>acumulador + valorAtual,0),
                pontos: aluno.historico.pontos.reduce((acumulador, valorAtual)=>acumulador + valorAtual,0),
                presencas: aluno.historico.presenca.reduce((acumulador, valorAtual)=>acumulador + valorAtual,0),
            }
            setHistorico(hist)
            setAlunoInfo(aluno)
        }
        if(usuario)
            getDocumentoUnico("professores",id,pegarHistorico,usuario.idEscola)
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
                        size={30}/></div>
                {!AlunoInfo.nome 
                    && <h3>Carregando Professor...</h3>
                }
                {AlunoInfo.nome  
                    && <h3>Professor {AlunoInfo.nome}</h3>
                }
            </div>
            {cadastramento && <FormProfessor cadastramento={desativarCadastramento} edit={AlunoInfo}/>}
            <div className={`${style.descricao}`}>
                {AlunoInfo.nome && 
                    <div>
                        <h3>Dados cadastrais</h3>
                        <p>Nome: {AlunoInfo.nome}</p>
                        <p>Data de nascimento: {AlunoInfo.nascimento}</p>
                        <p>Gênero: {AlunoInfo.genero}</p>

                        <h3>Dados da EBD</h3>

                        <p>Turma: {AlunoInfo.turmaNome}</p>
                        {/* <p>Dias presentes: {historico.presencas}</p> */}
                        <p>Frequência: {historico.presencas}</p>
                         <p>Bíblias: {historico.biblias}</p>
                        <p>Revistas: {historico.revistas}</p>
                        <p>Pontos: {historico.pontos}</p>
                        
                        {/* <p>Status: {historico.presencas}</p> */}
                        
                    </div>
                }
            </div>
            
            <div>
               
            </div>
            
        </div>
    )
}