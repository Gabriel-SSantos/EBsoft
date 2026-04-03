import { useEffect, useState } from 'react'
import style from './geral.module.css'
import { filtro, getDocCollection, getDocumentoUnico } from '../../../firebase/CRUD'
import { FichaAula, FichaRelatorio } from '../../layout/Fichas'
import LinkButton from '../../layout/LinkButton'
import { useAuth } from '../../../hooks/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function RelatorioMensal(){

    const {usuario} = useAuth()
    const [relatorios,setRelatorios]= useState()
    const [alunos,setAlunos] = useState()
    const [relatorioCrescimento, setRelatorioCrescimento] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        let mes = (new Date().getMonth() + 1)
        const ordenar = (ord)=>{
            
            let temp = 0
            for(let i = 0;i<ord.length - 1;i++){
                for(let j = 0; j < ord.length - i - 1;j++){
                    if(ord[j].data.dia > ord[j + 1].data.dia){
                    temp = ord[j]
                    ord[j] = ord[j + 1]
                    ord[j + 1] = temp
                    }
                }
                
            }
        }
        const pegarRelatorio = (doc)=>{
            console.log(doc)
            if(!doc || doc.length < 1){
                alert("Não foi gerado nenhum relatório nesse mês")
                return navigate(-1,{replace:true})
                
            }
            ordenar(doc)
            console.log(doc)
            doc.forEach(element => {
                let novo = {
                    nome:"Total",
                    qtd: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtd},0),
                    qtdAlunos: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtdAlunos},0),
                    qtdPresent: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtdPresent},0),
                    qtdProf: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtdProf},0),
                    qtdVisit: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtdVisit},0),
                    prof: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.prof},0),
                }
                
                element.progressao.push(novo)
            });
            let controle = Array(doc[0].progressao.length).fill(0)
            let crescimento = []
             doc.forEach(element => {
                element.progressao.forEach((fichaGrupo,i)=>{
                   
                    controle[i] += fichaGrupo.qtdVisit
                    
                })
            })
            doc[0].progressao.forEach((e,i) =>{
                e.qtdVisit = controle[i]
                crescimento.push({...e,qtdAlunosFim:doc[doc.length-1].progressao[i].qtdAlunos})
            })
           
            setRelatorioCrescimento(crescimento)
            console.log(doc)
            setRelatorios(doc)

        }
        filtro('relatorio','data.mes',"==",mes,pegarRelatorio,usuario.idEscola)
    },[])
    
    return(
        <section className={`${style.container}`}>

            <h3>Relatorios e estatísticas</h3>
                <section>
                    <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                        
                    </div>
                    <div className={`${style.geralList}`}>
                        {/* <div className={`${style.relatorios}`}> */}

                            {relatorios && <h3>Controle de Crescimento - Mês: {relatorios[0].data.mes < 9 ? '0'+relatorios[0].data.mes:relatorios[0].data.mes}</h3>}
                                <table className={`${style.tabela}`}>
                                    <thead>
                                        <tr>
                                            
                                            <th>F. Etária</th>
                                            <th>Nº Classes</th>
                                            <th>Nº Professores</th>
                                            <th>Nº Matriculados Inicio do Mês</th>
                                            <th>Nº Matriculados Fim do Mês</th>
                                            <th>Nº Visitantes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                                
                                        {relatorioCrescimento && 
                                        relatorioCrescimento.map((item,index)=>{  

                                            return <>{item.qtd != 0 && <tr key={index}>

                                                <td style={{ width:"100%",textAlign:"center"}}>{item.nome}</td>
                                                <td data-label=' Nº Classes'>{item.qtd}</td>
                                                <td data-label=' Nº Professores'>{item.qtdProf}</td>
                                                <td data-label=' Nº Matriculados Início do Mês'>{item.qtdAlunos}</td>
                                                <td data-label=' Nº Matriculados Fim do Mês'>{item.qtdAlunosFim}</td>
                                                <td data-label=' Nº Visitantes Mês'>{item.qtdVisit}</td>
                                                
                                            </tr> }</>
                                        })}
                                    
                                            
                                    </tbody>
                                </table>
                            {/* </div> */}
                            
                            <h3>Controle de Frequência de Aluno por Classe</h3>
                            {/* <div className={`${style.relatorios}`}></div> */}
                                <table className={`${style.tabela}`}>
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>F. Etária</th>
                                            <th>Professores Presentes</th>
                                            <th>Professores Ausentes</th>
                                            <th>Nº Presentes</th>
                                            <th>Nº Ausentes</th>
                                            <th>Ofertas</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {relatorios && 
                                            relatorios.map((dias,indexDias)=>{
                                            return<>
                                                <p>{`${dias.data.dia < 9 ? '0'+dias.data.dia:dias.data.dia}/${dias.data.mes < 9 ? '0'+dias.data.mes:dias.data.mes}/${dias.data.ano}`}</p>
                                            { dias.progressao.map((item,index)=>{
                                                return (
                                                    <>
                                                        {item.qtd != 0 &&
                                                        <tr key={index+'-'+indexDias}>
                                                            
                                                            <>
                                                            <td></td>
                                                            <td style={{ width:"100%",textAlign:"center"}}>{item.nome}</td>
                                                            <td data-label='Professores Presentes'>{item.prof}</td>
                                                            <td data-label='Professores Ausentes'>{item.qtdProf - item.prof}</td>
                                                            <td data-label='Presenças'>{item.qtdPresent}</td>
                                                            <td data-label='Ausências'>{item.qtdAlunos - item.qtdPresent}</td>
                                                            {item.nome == "Total" && <> <td data-label='Ofertas'>{Number(dias.ofertas).toFixed(2)}</td> 
                                                             <td data-label='Oferta Professores'>{Number(dias.ofertaProf).toFixed(2)}</td>   </>
                                                            }
                                                            </>
                                                            
                                                        </tr>
                                                        }
                                                    </>)
                                                })}

                                            
                                        </> })
                                            
                                        }
                                    </tbody>
                                </table>
                    </div>
                </section>
        </section>
    )
}