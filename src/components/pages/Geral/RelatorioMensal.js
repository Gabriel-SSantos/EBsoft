import { useEffect, useState } from 'react'
import style from './geral.module.css'
import { filtro, getDocCollection, getDocumentoUnico } from '../../../firebase/CRUD'
import { FichaAula, FichaRelatorio } from '../../layout/Fichas'
import LinkButton from '../../layout/LinkButton'
import { useAuth } from '../../../hooks/AuthContext'

export default function RelatorioMensal(){

    const {usuario} = useAuth()
    const [relatorios,setRelatorios]= useState()
    const [alunos,setAlunos] = useState()
    const [relatorioCrescimento, setRelatorioCrescimento] = useState()
    useEffect(()=>{
        let mes = (new Date().getMonth() + 1)
        console.log(mes)

        const ordenar = (ord)=>{
            
            let temp = 0
            for(let i = 0;i<ord.length - 1;i++){
                if(ord[i].data.dia > ord[i + 1].data.dia){
                    temp = ord[i]
                    ord[i] = ord[i + 1]
                    ord[i + 1] = temp
                }
            }
        }
        const pegarRelatorio = (doc)=>{
            ordenar(doc)
            // let = 
            doc.forEach(element => {
                let novo = {
                    nome:"Total",
                    qtd: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtd},0),
                    qtdAlunos: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtdAlunos},0),
                    qtdPresent: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtdPresent},0),
                    qtdProf: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtdProf},0),
                    qtdVisit: element.progressao.reduce((acumulador,valorTurma)=>{return acumulador + valorTurma.qtdVisit},0),
                }
                element.progressao.push(novo)
            });
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
                        
                            
                            
                                {relatorios && 
                                    relatorios.map((item,indexRelatorio)=>{
                                     return(<div key={indexRelatorio}>
                                    <h2>Relatorio data {`${item.data.dia}/${item.data.mes}/${item.data.ano}`}</h2>
                                    <table className={`${style.tabela}`}>
                                        <thead>
                                            <tr>
                                                <th>Faixa Etária</th>
                                                <th>Nº Classes</th>
                                                <th>Nº Professores</th>
                                                <th>Alunos matriculados</th>
                                                <th>Alunos Presentes</th>
                                                <th>Alunos Ausentes</th>
                                                <th>Oferta: {item.ofertas}</th>
                                            </tr>
                                        </thead>
                                    <tbody > {item.progressao.map((relatorioDia,index)=>{
                                         return <tr key={`${indexRelatorio}-${index}` }>
                                            <td>{relatorioDia.nome}</td>
                                            <td>{relatorioDia.qtd > 0 ? relatorioDia.qtd:""}</td>
                                            <td>{relatorioDia.qtdProf > 0 ? relatorioDia.qtdProf:""}</td>
                                            <td>{relatorioDia.qtdAlunos > 0 ? relatorioDia.qtdAlunos:""}</td>
                                            <td>{relatorioDia.qtdPresent > 0 ? relatorioDia.qtdPresent:""}</td>
                                            <td>{(relatorioDia.qtdAlunos - relatorioDia.qtdPresent) > 0 ? (relatorioDia.qtdAlunos - relatorioDia.qtdPresent):""}</td>        
                                        </tr>
                                    
                                        })}
                                        </tbody>
                                        </table>
                                    </div>
                                        )
                                    }
                                   
                                    
                                    )
                                    
                                }
                                {/* <th>{relatorios[0].progressao[11].qtdProf}</th>
                                                <th>{relatorios[relatorios.length - 1].progressao[11].qtdProf}</th> */}
                                {/* {relatorios && 
                                <div>
                                    <h2>Controle de Crescimento</h2>
                                    <table className={`${style.tabela}`}>
                                        <thead>
                                            <tr>
                                                <th>Faixa etária</th>
                                                <th>Nº Professores</th>
                                                <th>
                                                    Alunos Matriculados
                                                    <th>Início do Mês</th>
                                                    <th>Fim do Mês</th>
                                                </th>
                                                <th>Nº visitantes no mês</th>
                                            </tr>
                                        </thead>
                                    <tbody > {relatorios[0].progressao.map((relatorioDia,index)=>{
                                         return <tr key={`${index}`}>
                                            <td>{relatorioDia.nome}</td>
                                            <td>{relatorioDia.qtdProf}</td>
                                            
                                            <td>{relatorioDia.qtdAlunos > 0 ? relatorioDia.qtdAlunos:""}</td>
                                            <td>{relatorioDia.qtdAlunos > 0 ? relatorioDia.qtdAlunos:""}</td>
                                        
                                            
                                            <td>{
                                                }</td>        
                                        </tr>
                                    
                                        })}
                                        </tbody>
                                        </table>
                                    </div>
                                        
                                    
                                      
                                } */}
                           
                        
                    </div>
                </section>
        </section>
    )
}