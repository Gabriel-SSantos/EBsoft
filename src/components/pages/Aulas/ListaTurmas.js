
import style from "./aulaLista.module.css"
import { useEffect, useState } from "react"
import { getDocumentoUnico, getItens } from "../../../firebase/CRUD"
import { useParams } from "react-router-dom"
import { FichaAulaTurma } from "../../layout/Fichas"
import BackButton from '../../layout/BackButton'
export default function ListaTurmas(){

    const {id} = useParams()
    const [aulaInfo, setAulaInfo] = useState({})
    const [listaTurmas, setListaTurmas] = useState([])
    useEffect(()=>{
        getDocumentoUnico("aulas",id,setAulaInfo)
        getItens("turmas",setListaTurmas)
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
                    {/* <BiPencil
                    onClick={
                       ativarCadastramento
                    }
                    size={30}/> */}
                </div>
                <div style={{width: "100%"}}>
                {aulaInfo.licao  
                    &&
                    <h2>{aulaInfo.licao}</h2>}</div>
            </div>
            
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
                        // descricaoTurma={item.descricao}
                    />
                )
            }
        </div>
    )
}