import { data, useLocation } from "react-router-dom"
import style from './aulaLista.module.css'
import BackButton from "../../layout/BackButton"
import { BiPencil } from "react-icons/bi"
import { Relatorio } from "./ListaTurmas"
import { GrDocumentDownload } from "react-icons/gr"
import { useEffect, useState } from "react"
import { filtro, getDocCollection, updateItem } from "../../../firebase/CRUD"
import { collection, documentId } from "firebase/firestore"
import { salvar } from "../../Forms/Cadastro"
import { useAuth } from "../../../hooks/AuthContext"
export default function RelatorioDetalhado(){
    const location = useLocation()
    const {usuario} = useAuth()
    const turmas = location.state?.listaTurmas
    const geral = location.state?.geral
    const dadosAula = location.state?.dadosAula
    const [dadosTurmas,setDadosTurmas] = useState()
    const progressao = [
        {nome:'Berçário',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Maternal',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Primário',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Juniores',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Pré-adolescentes',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Adolescentes',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Juvenis',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Jovens',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Adultos',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Discipulado',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        {nome:'Classe Mista',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0,prof:0},
        // {nome:'professores',qtd:0,qtdProf:0,qtdAlunos:0,qtdVisit:0,qtdPresent:0}
    ]

    useEffect(()=>{
        const pegarTurmas = (doc)=>{
            let turmaProfessores 
            let profsTurma = []
            turmas.forEach(element => {
                if (element.nome == 'Professores')
                    turmaProfessores = element
                else{
                    console.log(element)
                    let prov = 0
                    if(element.presencas[0])
                        element.presencas = [element.presencas[0],0]
                    else {
                        prov = element.presencas 
                        element.presencas = []
                        element.presencas = [prov,0]
                    }
                }
            });
            console.log(turmas)
            // console.log(turmaProfessores)
            

            turmaProfessores.listaAlunos.forEach(element =>{
                turmas.map((item)=>{
                    if(element.turmaNome == item.nome && item.nome != "Professores"){
                        if(element.presencas){
                            console.log(item)
                            item.presencas[1] += 1
                        }
                    }
                })
            })
            console.log(profsTurma)
            doc.map((element) => {
                for(let i=0;i<progressao.length;i++){
                if(element.grupo == progressao[i].nome){
                    
                    progressao[i].qtd += 1 
                    progressao[i].qtdProf += element.professor.length
                    
                    turmas.map((item)=> {
                       if(element.id == item.idTurma){
                            // console.log(item)
                            progressao[i].qtdAlunos += item.matriculados
                            progressao[i].qtdVisit += item.visitantes
                            progressao[i].qtdPresent += item.presencas[0]
                            progressao[i].prof += item.presencas[1]
                       } 
                            
                    })
                }
            }
            });
            setDadosTurmas(doc)
            const relatorio = {
                progressao,
                data:turmas[0].data,
                ofertas: geral.totalOfertas,
                ofertaProf: turmaProfessores.totalOfertas,
                licao: dadosAula.licao
            }
            salvar({
                localstore:"relatorio",
                item:relatorio,
                idEscola:usuario.idEscola
            })
        }
        if(dadosAula.situacao === "aberta" && usuario){
           
            getDocCollection("turmas",pegarTurmas,usuario.idEscola)
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
                usuario.idEscola
            )
        }
       
    },[usuario])

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