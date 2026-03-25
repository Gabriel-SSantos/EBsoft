import { useLocation } from "react-router-dom"
import style from './aulaLista.module.css'
import BackButton from "../../layout/BackButton"
import { BiPencil } from "react-icons/bi"
import { Relatorio } from "./ListaTurmas"
import { GrDocumentDownload } from "react-icons/gr"
import { useEffect } from "react"
import { updateItem } from "../../../firebase/CRUD"
export default function RelatorioDetalhado(){
    const location = useLocation()
    const turmas = location.state?.listaTurmas
    const geral = location.state?.geral
    const dadosAula = location.state?.dadosAula
    
    useEffect(()=>{
        console.log(dadosAula)
        if(dadosAula.situacao === "aberta"){
            let percentual = Number((100*geral.presencas)/geral.matriculados).toFixed(2)
            dadosAula.biblia = geral.biblias
            dadosAula.presencas = geral.presencas
            dadosAula.oferta = geral.totalOfertas
            dadosAula.revista = geral.revistas
            dadosAula.matriculados = geral.matriculados
            dadosAula.visitantes = geral.visitantes
            dadosAula.aproveitamento = percentual
            dadosAula.situacao = "fechada"
            updateItem(
                "aulas",
                dadosAula.id,
                dadosAula,
            )
        }
    },[])

    return (
        <div className={`${style.relatorioConteiner}`}>
            <div className={`${style.relatorioDetalhado}`}>
                <div style={{
                    display:"flex",
                    width:"90%",
                    justifyContent:"space-between"
                }}>
                    <BackButton/>
                    <GrDocumentDownload
                    
                    size={30}/></div>
              
                <h2>Relatório Escola Bíblia</h2>
                <h3>Lição {dadosAula.licao}</h3>
                
            </div>
            <div className={`${style.relatoriosListas}`}>   
                <h3>Relatorio Geral</h3>
                <Relatorio aula={geral}/>
                <h2>Relatório por turmas</h2>
                { turmas.map((item,id)=>
                    <> 
                        <h3>{item.nome}</h3>
                        <Relatorio 
                            key={id}
                            aula={item}
                        />
                    </>
                )
                }
            </div>
        </div>
    )
}