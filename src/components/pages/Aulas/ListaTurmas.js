import style from "./aulaLista.module.css"
import { useEffect, useState } from "react"
import { getDocumentoUnico, filtro } from "../../../firebase/CRUD"
import {documentId} from "firebase/firestore";
import { useParams } from "react-router-dom"
import { FichaAulaTurma } from "../../layout/Fichas"
import BackButton from '../../layout/BackButton'
export default function ListaTurmas(){

    const {id} = useParams()
    const [aulaInfo, setAulaInfo] = useState({})
    const [listaTurmas, setListaTurmas] = useState([])
    
    

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
    
    
    return(
        <div className={`${style.container}`}>
            <div className={`${style.cabecalho}`}>
                <div style={{
                    display:"flex",
                    width:"90%",
                    justifyContent:"space-between"
                }}>
                    <BackButton/>
                </div>
                <div style={{width: "100%"}}>
                {aulaInfo.licao  
                    &&
                    <h2>{aulaInfo.licao}</h2>}
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
        </div>
    )
}