import style from "./aulaLista.module.css"
import { useEffect, useState } from "react"
import { getDocumentoUnico, filtro } from "../../../firebase/CRUD"
import {documentId} from "firebase/firestore";
import { useParams } from "react-router-dom"
import { FichaAulaTurma } from "../../layout/Fichas"
import BackButton from '../../layout/BackButton'
import { BiPencil } from "react-icons/bi";
import LinkButton from "../../layout/LinkButton";

export function Relatorio({aula}){
    let total = aula.totPresenca + aula.totVisitantes
    let percentual = Number((100*aula.totPresenca)/aula.totAlunos).toFixed(2)
    return(
        <div className={`${style.resumo}`}>
                
                <div><p>Matriculados</p><p>{aula.totAlunos}</p></div>
                <div>
                    <div style={{width:"50%"}}><p>Presentes</p><p>{aula.totPresenca}</p></div>
                    <div style={{width:"50%"}}><p>Ausentes</p><p>{aula.totAusentes}</p></div>
                </div>
                <div>
                    <div style={{width:"50%"}}><p>Total visitantes: </p><p>{aula.totVisitantes}</p></div>
                    <div style={{width:"50%"}}><p>Total: </p><p>{total}</p></div>
                </div>
                <div>
                    <div style={{width:"50%"}}><p>Total de Bíblias: </p><p>{aula.totBiblia}</p></div>
                    <div style={{width:"50%"}}><p>Total de Revistas: </p><p>{aula.totRevista}</p></div>
                </div>
                <div><p>Total de Ofertas</p><p>{aula.totOferta}</p></div>
                <div><p>Percentual</p><p>{percentual}%</p></div>
            </div>
    )
}

export default function ListaTurmas(){

    const {id} = useParams()
    const [aulaInfo, setAulaInfo] = useState({})
    const [listaTurmas, setListaTurmas] = useState([])
    const [cadastramento,setCadastramento] = useState(false)
    const [geral, setGeral] = useState({})
    useEffect(()=>{
        const computarDados = (doc)=>{
            let Bib = 0
            let Rev = 0
            let Pres = 0
            let Ofer = 0
            let totAlunos = 0
            let totAusentes = 0
            let totVisitantes = 0
        
            if(doc){
                doc.forEach((element)=>
                {
                    if(element.matriculados){
                        Bib += element.biblias
                        Pres += element.presencas
                        Rev += element.revistas
                        Ofer += Number(element.totalOfertas)
                        totAlunos += element.matriculados
                        totAusentes += element.ausentes
                        totVisitantes += Number(element.visitantes)
                    }
                }) 
                setGeral({
                    totAlunos: totAlunos,
                    totPresenca: Pres,
                    totOferta: Ofer,
                    totAusentes: totAusentes,
                    totVisitantes: totVisitantes,
                    totBiblia: Bib,
                    totRevista: Rev,
                    id: id,
                    nome: aulaInfo.nome,
                    data: aulaInfo.dataAula
                })
            }
            setListaTurmas(doc)
        }
        const listasTurma = (doc)=>{
            setListaTurmas([])
            setAulaInfo(doc)
            if(doc.turmas.length && doc.turmas.length > 0){
                filtro("aulaTurma",documentId(),"in",doc.turmas,computarDados)
            }       
        } 
        getDocumentoUnico("aulas",id,listasTurma).then((sla)=>console.log(sla))
    },[])

    
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
                    width:"100%",
                    justifyContent:"space-between"
                }}>
                    <BackButton/>
                    <BiPencil
                        onClick={
                            ativarCadastramento
                        }
                        size={30}/>
                </div>
                <div>
                {aulaInfo.licao  
                    &&
                    <h2>Lição {aulaInfo.licao} - {aulaInfo.dataAula}</h2>}
                </div>
            </div>
            {console.log(listaTurmas)}
            {
                listaTurmas.length == 0 
                && <p>Carregando turmas...</p>
            }
            {listaTurmas.length > 0 && 
                listaTurmas.map((item,id)=>
                    <FichaAulaTurma 
                        key={id}
                        id={item.id}   
                        nomeTurma={item.nome}
                        situacao={item.situacao}
                    />
                )
            }
            <h3>Resumo Geral</h3>
            {geral && <Relatorio aula={geral}/>}
            <LinkButton text={"Ver Detalhado"} to={"/relatorio"} state={{listaTurmas:listaTurmas,geral:geral}}/>
        </div>
    )
}