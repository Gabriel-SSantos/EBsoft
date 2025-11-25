import LinkButton from '../../layout/LinkButton'
import style from './placar.module.css' 
import { useLocation } from 'react-router-dom'
import { BiTrophy } from 'react-icons/bi'
const proxduelos=(vencedor,times)=>{
    const TAM = times.length
    let temp = ""
    if(TAM == 2) return
    if(vencedor == 1){
        temp = times[0]
        times[0] = times[2]
        times[2] = temp 
    }
    for(let i = vencedor+1;i < TAM - 1;i++){
        temp = times[i]
        times[i] = times[i+1]
        times[i+1] = temp
    }
}

export default function Vencedor(){
    const location = useLocation()
    const dadosRecebido = location.state?.meustimes
    const vencedor = location.state?.vencedor
    proxduelos(vencedor,dadosRecebido)
    console.log(dadosRecebido)
    if(dadosRecebido[0][0].nome){
        const pontos = dadosRecebido[vencedor].length -1
        dadosRecebido[vencedor][pontos].pontos += 1 
        return(
            <div className={`${style.vencedor_container}`}>
            <h1>Parabéns!!</h1>
            <p>Vencedor: Time {dadosRecebido[vencedor][0].nome}</p>
            <p>Pontos: {dadosRecebido[vencedor][pontos].pontos}</p>
            <p>{dadosRecebido[vencedor].map((item,id)=>
                <li key={id}>{item.nome}</li>
            )}</p>
            <BiTrophy size={220}/>
            Proximo jogo: <p>{dadosRecebido[0].map((item,id)=>{ if(item.nome){
                    return <li key={id}>{item.nome}</li>}}
            )} </p> <spam>x</spam> <p>{dadosRecebido[1].map((item,id)=>
                <li key={id}>{item.nome}</li>
            )}</p>
            <LinkButton to={"/placar"} text={"Pronto"} state={{meustimes:dadosRecebido}}/>
        </div>
        )
    }
    return(
        <div className={`${style.vencedor_container}`}>
            <h1>Parabéns!!</h1>
            <p>Vencedor time {dadosRecebido[vencedor]}</p>
            <BiTrophy size={220}/>
            <p>Proximo jogo: {dadosRecebido[0]} x {dadosRecebido[1]}</p>
            <LinkButton to={"/placar"} text={"Pronto"} state={{meustimes:dadosRecebido}}/>
        </div>
    )
}