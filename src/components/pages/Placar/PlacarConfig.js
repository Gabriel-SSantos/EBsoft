import style from './placar.module.css'
import LinkButton from '../../layout/LinkButton'
import { useEffect, useState } from 'react'

const TimeAdd=({adicionarNovoNome})=>{
    const [timeNome,setTimeNome] = useState("")
    
    const atulizarNome = (e)=>{
        setTimeNome(e.target.value)
    }

    return(
        <div>
        <input
            type='text'
            placeholder='Nome do time'
            value={timeNome}
            onChange={atulizarNome}
        />
        <button onClick={()=>adicionarNovoNome(timeNome)}>Ok</button>
        </div>
    )

}

export default function PlacarConfig(){
    const [times,setTimes] = useState([])
    // useEffect(()=>{
        
    // },[times])
    const addNovoTime = (nome)=>{
        let vetor = [nome]
        if (times.length > 0){
            times.map((item)=>{ 
                console.log(item)
                vetor.push(item)
            })
        }
        setTimes(vetor)
        console.log(times)
    }
    return(
        <div className={`${style.placar_config_conteiner}`}>
            <h2>Configure o placar</h2>
            <div>
                <p>Adicione os times</p>
                <ul>{times && 
                    times.map((item,i)=>
                        <li key={i}>{item}</li>
                    )}</ul>
                <TimeAdd 
                    adicionarNovoNome={addNovoTime}
                />
            </div>
            <LinkButton to={"/placar"} state={{meustimes:times,indices:times.length}} text={"Times prontos"}/>
        </div>
    )
}