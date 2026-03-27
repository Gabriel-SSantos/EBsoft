import { useEffect, useState } from 'react'
import style from './geral.module.css'
import { filtro, getDocCollection, getDocumentoUnico } from '../../../firebase/CRUD'
import { FichaAula, FichaRelatorio } from '../../layout/Fichas'
import LinkButton from '../../layout/LinkButton'

export default function Geral(){

    const [aulas,setAulas]= useState()
    const [alunos,setAlunos] = useState()
    useEffect(()=>{
        // getDocCollection("aulaTurma",setAulas)
        getDocCollection('alunos',setAlunos)
    },[])

    console.log(alunos)
    return(
        <section className={`${style.container}`}>
            <h3>Relatorios e estatísticas</h3>
                <section>
                    <div>
                        <h2>Relatorios</h2>
                        <LinkButton text={"Gerar relatório mensal"} to={"/relatoriomensal"}/>
                    </div>
                    <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                        
                    </div>
                    <div className={`${style.geralList}`}>
                        {aulas && 
                            aulas.map((item)=>{
                                <div>
                                    <p>{item}</p>
                                </div>
                               
                            })
                        }
                    </div>
                </section>
        </section>
    )
}