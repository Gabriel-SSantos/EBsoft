import { useEffect, useState } from "react"
import style from "./placar.module.css"
import { useNavigate, useLocation } from "react-router-dom"
 const ButtonPnt = ({nome,pnt, i,pontuar, retirarPonto,color})=>{
        return(
            <div 
                className={`${style.placar_banda}`}
                style={{backgroundColor:`${color}`}}    
            >
                <p 
                    style={{fontSize:"50px", fontWeight:"bold",color:"white", fontFamily:"'Courier New', Courier, monospace"}}
                >{nome}</p>
                <div 
                    className={`${style.placar_numero}`}
                    
                    >    
                    <input type="button" 
                    value={"-"}
                    onClick={ 
                        ()=>{
                            if(pnt>0)
                            retirarPonto(i)
                            
                        }}/>
                    <p 
                        style={{fontSize:"260px",width:"95%",fontWeight:"bolder",}}
                        onClick={()=>pontuar(i)}
                    >{pnt}</p>
                    {/* <input type="button" 
                    value={"+"}
                        onClick={()=>pontuar(i)}
                    /> */}
                </div>
            </div>
        )
    }


export default function Placar(){

    const location = useLocation()
    const dadosRecebido = location.state?.meustimes
    const [timesAtuais,setTimesAtuais] = useState(["time1","time2"])
    const [meusTimes,setMeusTimes] = useState(["time1","time2"])
    const [time,setTime] = useState([0,0])
    const [pntVencedor,setPntVencedor] = useState(5)

    let timeVencedor = -1

    const navigate = useNavigate()
   
    const pontuar = (i)=>{
        const atuliazar = time.map((ponto, index) =>{
            if(index === i){
                return ponto + 1
            }
            return ponto
        })
        setTime(atuliazar)
    }

    const retirarPonto = (i)=>{
        const atuliazar = time.map((ponto, index) =>{
            if(index === i){
                return ponto - 1
            }
            return ponto
        })
        setTime(atuliazar)
    }
    useEffect(()=>{
        let v = []
        if (dadosRecebido){
            console.log(dadosRecebido)
            if(dadosRecebido[0][0].nome){
                console.log("Aaboa")
                v = [dadosRecebido[0][0].nome,dadosRecebido[1][0].nome]
            }
            else
                v = [dadosRecebido[0],dadosRecebido[1]]
            setTimesAtuais(v)
            setMeusTimes(dadosRecebido)
        }
        if(pntVencedor == 5 && (time[0] >= 1 && time[1] >= 1)){
            console.log("oba")
            setPntVencedor(7)
        } else if(pntVencedor == 7 && (time[0] >= 2 && time[1] >= 2)){
            setPntVencedor(12)
        } else if(time[0] == pntVencedor - 1 && time[0] == time[1]){
            setPntVencedor(pntVencedor + 1)
        }
        else if(time[0] == pntVencedor  || time[1] == pntVencedor){
            timeVencedor = (time[0]==pntVencedor? 0:1)
            alert(`Muito Bem!!`)
            
            const timer = setTimeout(() => {
                navigate('/placarvencedor',{state:{meustimes:meusTimes,vencedor:timeVencedor}})
            }, 1000);
            return () => clearTimeout(timer)
        } 
    },[time])
    return(
        <div className={`${style.placar_container}`}>
           <ButtonPnt 
                pnt={time[0]} i={0} 
                pontuar={pontuar}
                nome={timesAtuais[0]}
                retirarPonto={retirarPonto}
                color={"#0050D8"}
            />
           <ButtonPnt pnt={time[1]} 
                i={1} 
                nome={timesAtuais[1]}
                pontuar={pontuar}
                retirarPonto={retirarPonto}
                color={"#D3B700"}
            />
        </div>
    )
}
