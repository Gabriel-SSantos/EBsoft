import { BiBible } from 'react-icons/bi'
import { BiBook } from 'react-icons/bi'
import { FaCoins } from 'react-icons/fa'
import { BsPersonFill } from 'react-icons/bs'
import style from "./aulaLista.module.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { filtro,getDocumentoUnico,updateItem } from "../../../firebase/CRUD"
import { salvar } from '../../Forms/Cadastro'
import {  FichaAlunoChamada } from "../../layout/Fichas"

export default function AulaChamada(){

    const [AlunosTurma,setAlunosTurma] = useState([])
    const [totBiblia, setTotBiblia] = useState(0)
    const [totRevista, setTotRevista] = useState(0)
    const [totOferta, setTotOferta] = useState(0)
    const [totPresenca,setTotPresenca] = useState(0)
    const [visitantes,setVisitantes] = useState(0)
    const [click,setClick] = useState(false)
    const [aula,setAula] = useState()
     const {id} = useParams()

    useEffect(()=>{
        const listaAlunos = (doc)=>{
            if(!doc.listaAlunos){
                filtro("alunos","turma","==",doc.idTurma,setAlunosTurma)
            }else {
                setAlunosTurma(doc.listaAlunos)
            }
            setAula(doc)
        }
        getDocumentoUnico("aulaTurma",id,listaAlunos)
    },[])

   const contar = ()=>{
        let totBib = 0
        let totRev = 0
        let totPres = 0
        AlunosTurma.forEach((element)=>{
            if(element.biblia) 
                totBib++
            if(element.revista)
                totRev++
            if(element.presenca > 0)
                totPres++
        })
        setTotBiblia(totBib)
        setTotRevista(totRev)
        setTotPresenca(totPres)
   }
    const marcarBiblia = (index)=>{
        AlunosTurma[index].biblia = !AlunosTurma[index].biblia 
        contar()
    }
    const marcarRevista = (index)=>{
        AlunosTurma[index].revista = !AlunosTurma[index].revista 
        contar()
    }
    const marcarOferta = (index)=>{
        AlunosTurma[index].oferta = !AlunosTurma[index].oferta 
        setClick(!click)
    }
    const marcarPonto = (index)=>{
        AlunosTurma[index].pontos += 1 
        setClick(!click)
        console.log(AlunosTurma[index].nome, " fez ", AlunosTurma[index].pontos, " pontos")
    }
    const mudancaEstadoVisitantes = (e)=>{
        console.log(e.target.value)
        setVisitantes(e.target.value)
    }
    return(
        <div className={`${style.container}`}>
            <div style={{width: "100%"}}>
                <h2>Alunos</h2>
            </div>
           
            {AlunosTurma.length > 0 && 
                AlunosTurma.map((item,id)=>
                    <FichaAlunoChamada
                        key={id}
                        id={id}   
                        nome={item.nome}
                        marcarBiblia={marcarBiblia}
                        marcarRevista={marcarRevista}
                        marcarOferta={marcarOferta}
                        marcarPonto={marcarPonto}
                        oferta={item.oferta}
                        biblia={item.biblia}
                        revista={item.revista}
                        pontos={item.pontos}
                    />
                )
            } 
            <div>
                <p>Visitantes: </p>
                <input 
                type="number"
                onChange={mudancaEstadoVisitantes}
                value={visitantes}
                />
            </div>
            <div>
                <p>Resumo</p>
                <div>
                    <p>Total de Bíblias</p>
                    <p>{totBiblia} <BiBible size={20} color='brown'/></p>
                </div>
                <div>
                    <p>Total de Revistas</p>
                    <p>{totRevista} <BiBook size={20} color='blue'/></p>
                </div>
                <div>
                    <p>Total de Ofertas</p>
                    <p>{} <FaCoins size={20} color='orange'/></p>
                </div>
                <div>
                    <p>Visitantes</p>
                    <p>{visitantes} <BsPersonFill size={20} color='black'/></p>
                </div>
            </div>
            <button
                onClick={()=>{
                    if(AlunosTurma.length > 0){
                        let alunos = []
                        AlunosTurma.forEach((item)=>{
                            alunos.push({
                                nome: item.nome,
                                presenca: item.presencas,
                                revista: item.revista,
                                biblia: item.biblia,
                                oferta: item.oferta
                            })
                        })
                        let turmaAula = {
                            listaAlunos: alunos,
                            visitantes: visitantes,
                            situacao: "fechada",
                            nome: aula.nome,
                            biblias: totBiblia,
                            revistas: totRevista,
                            presencas: totPresenca,
                        }
                        console.log(turmaAula)
                        updateItem(
                            "aulaTurma",
                            id,
                            turmaAula,
                        )
                    }
                    
                }}
            >
                Enviar Relatório
            </button>
        </div>
    )
}