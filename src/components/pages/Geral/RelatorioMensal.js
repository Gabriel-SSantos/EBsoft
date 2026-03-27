import { useEffect, useState } from 'react'
import style from './geral.module.css'
import { filtro, getDocCollection, getDocumentoUnico } from '../../../firebase/CRUD'
import { FichaAula, FichaRelatorio } from '../../layout/Fichas'
import LinkButton from '../../layout/LinkButton'

export default function RelatorioMensal(){

    const [relatorios,setRelatorios]= useState()
    const [alunos,setAlunos] = useState()


    useEffect(()=>{
        // getDocCollection("aulaTurma",setAulas)
        let mes = (new Date().getMonth() + 1)
        console.log(mes)
        filtro('aulaTurma','data.mes',"==",mes,setRelatorios)
        // getDocCollection('alunos',setAlunos)
    },[])

    console.log(relatorios)
    return(
        <section className={`${style.container}`}>
            <h3>Relatorios e estatísticas</h3>
                <section>
                    
                    <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                        
                    </div>
                    <div className={`${style.geralList}`}>
                        {relatorios && 
                            relatorios.map((item)=>{
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