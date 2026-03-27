import { useLocation } from "react-router-dom"
import style from './aulaLista.module.css'
import BackButton from "../../layout/BackButton"
import { BiPencil } from "react-icons/bi"
import { Relatorio } from "./ListaTurmas"
import { GrDocumentDownload } from "react-icons/gr"
import { useEffect, useState } from "react"
import { filtro, getDocCollection, updateItem } from "../../../firebase/CRUD"
import { documentId } from "firebase/firestore"
export default function RelatorioDetalhado(){
    const location = useLocation()
    const turmas = location.state?.listaTurmas
    const geral = location.state?.geral
    const dadosAula = location.state?.dadosAula
    const [dadosTurmas,setDadosTurmas] = useState()

    const progressao = [
        {nome:'Berçário',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Maternal',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Primário',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Juniores',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Pré-adolescentes',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Adolescentes',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Juvenis',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Jovens',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Adultos',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Discipulado',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0},
        {nome:'Classe Mista',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0}
    ]

    useEffect(()=>{
        console.log(turmas)
        
        const pegarTurmas = (doc)=>{
            console.log(turmas)

            doc.map((element) => {
                for(let i=0;i<progressao.length;i++){
                if(element.grupo == progressao[i].nome){
                    
                    progressao[i].qtd += 1 
                    progressao[i].qtdProf += element.professor.length
                    
                    turmas.map((item)=> {
                       if(element.id == item.idTurma){
                            console.log(item)
                            progressao[i].qtdAlunos += item.matriculados
                            progressao[i].qtdVisit += item.visitantes
                            progressao[i].qtdVisit += item.presencas
                       } 
                            
                    })
                }
            }
            });
            setDadosTurmas(doc)
        }
        getDocCollection("turmas",pegarTurmas)
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