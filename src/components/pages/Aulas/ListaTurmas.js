import style from "./aulaLista.module.css"
import { useEffect, useState } from "react"
import { getDocumentoUnico, filtro } from "../../../firebase/CRUD"
import {documentId} from "firebase/firestore";
import { useParams } from "react-router-dom"
import { FichaAulaTurma } from "../../layout/Fichas"
import BackButton from '../../layout/BackButton'
import { BiPencil } from "react-icons/bi";
export default function ListaTurmas(){

    const {id} = useParams()
    const [aulaInfo, setAulaInfo] = useState({})
    const [listaTurmas, setListaTurmas] = useState([])
    const [cadastramento,setCadastramento] = useState(false)
    

    useEffect(()=>{
        const listasTurma = (doc)=>{
            setListaTurmas([])
            setAulaInfo(doc)
            if(doc.turmas.length && doc.turmas.length > 0){
                filtro("aulaTurma",documentId(),"in",doc.turmas,setListaTurmas)
            }       
        } 
        getDocumentoUnico("aulas",id,listasTurma)
        
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
            <div className={`${style.resumo}`}>
                
                <div><p>Matriculados</p><p>{}</p></div>
                <div>
                    <div style={{width:"50%"}}><p>Presentes</p><p>{}</p></div>
                    <div style={{width:"50%"}}><p>Ausentes</p><p>{}</p></div>
                </div>
                <div>
                    <div style={{width:"50%"}}><p>Total visitantes: </p><p>{}</p></div>
                    <div style={{width:"50%"}}><p>Total: </p><p>{}</p></div>
                </div>
                <div>
                    <div style={{width:"50%"}}><p>Total de Bíblias: </p><p>{}</p></div>
                    <div style={{width:"50%"}}><p>Total de Revistas: </p><p>{}</p></div>
                </div>
                <div><p>Total de Ofertas</p><p>{}</p></div>
                <div><p>Percentual</p><p>{}</p></div>
            </div>
        </div>
    )
}