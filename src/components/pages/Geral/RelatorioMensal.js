import { useEffect, useState } from 'react'
import style from './geral.module.css'
import { filtro, getDocCollection, getDocumentoUnico } from '../../../firebase/CRUD'
import { FichaAula, FichaRelatorio } from '../../layout/Fichas'
import LinkButton from '../../layout/LinkButton'

export default function RelatorioMensal(){

    const [relatorios,setRelatorios]= useState()
    const [alunos,setAlunos] = useState()


    useEffect(()=>{
        let mes = (new Date().getMonth() + 1)
        console.log(mes)
        const pegarRelatorio = (doc)=>{
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
            
            setRelatorios(doc)
            console.log(doc)
        }
        filtro('relatorio','data.mes',"==",mes,pegarRelatorio)
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
                                        </table></div>
                                        )
                                    }
                                    
                                    )

                                }
                           
                        
                    </div>
                </section>
        </section>
    )
}