import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import style from './times.module.css'
import LinkButton from "../../layout/LinkButton"

const bublesort=(v,tam)=>{
    let temp = 0
    
    for(let i=0;i<tam-1;i++){
        // console.log("Dentro do buble ", v, " Tamanho ",tam)
        temp = v[i]
        for(let j=i+1;j<tam;j++){
            if(Number(v[i].nivel) < Number(v[j].nivel)){
                v[i] = v[j]
                v[j] = temp
                temp = v[i]
            }
        }
    }
    // console.log("Buble: ", v)
    return v
}

const Ficha = ({nome, componentes})=>{
   
    bublesort(componentes,componentes.length)
    return(
        <div className={`${style.cardFicha}`}>
                <div>
                    <p>Time: {componentes[0].nome}</p>
                </div>
                <div>
                    <p>Componentes: </p>
                    {componentes.map((item,id)=>
                         <li key={id}>{item.nome}</li>)}
                </div>
            <div>
                
            </div>
        </div>
    )
}


export default function Embaralhamento(){
    const location = useLocation()
    const navigate = useNavigate()
    const jogadores = location.state?.jogadores
    // const [jogadores,setJogadores] = useState([])
    const [times,setTimes] = useState([])

    const escolherItem=(v,tam)=>{
        return v[Math.floor(Math.random() * tam)]
    }
    
    const remover = (filtro,Original)=>{
        let v = []
        Original.map((item)=>{
           if(item.nome != filtro){
                v.push(item)
            }})
        return v
    }

    const somarItens = (v)=>{
        let soma = 0
        v.map((item)=>{
            soma += parseInt(item.nivel)
        })
        return soma
    }
    const embaralhar= async ()=>{
        const TAM = jogadores.length
        let somaNivel = 0
        let MediaTotal = 0
        let TotTimes = 0
        let reservas = 0
        let MediaTime = 0
        let desvioPadrao = 0
        let vTemp = []
        let vTempBoys = []
        let vTempGirls = []
        let vetor = []
        let vetorAcumulado = []
        let Totgirl = []
        let Totboy = []
        let item = []
        let continua = true
        let BoyGrup = 2
        let GirlGrup = 2
        let contadorLoop = 0
        let maxLoop = 200
        let reservasAdd = 0
        jogadores.map((item)=>{
            somaNivel += parseInt(item.nivel)
            if(item.genero === "M")
                Totboy.push(item)
            else
                Totgirl.push(item)
        })
        
        MediaTotal = somaNivel/TAM
        TotTimes = parseInt(TAM/4)
        reservas = TAM - TotTimes*4
        console.log("Reservas: ", reservas)
        for(let i = 0; i < TotTimes; i++){
            contadorLoop = 0
            do{
                GirlGrup = 2
                BoyGrup = 2

                if(Totboy.length < 2){
                    GirlGrup += BoyGrup - Totboy.length
                    BoyGrup = Totboy.length
                }
                if(Totgirl.length < 2){
                    BoyGrup += GirlGrup - Totgirl.length
                    GirlGrup = Totgirl.length}
                
                while(BoyGrup > 0){
                    item = escolherItem(Totboy,Totboy.length)
                    vTempBoys.push(item)
                    Totboy = remover(item.nome,Totboy)
                    BoyGrup--
                }
                while(GirlGrup > 0){
                    item = escolherItem(Totgirl,Totgirl.length)
                    vTempGirls.push(item)
                    Totgirl = remover(item.nome,Totgirl)
                    GirlGrup--
                }
                if(reservas > 0){
                    do{
                        if((Totboy.length - Totgirl.length) >= 0){
                            console.log("Reserva homem")
                            item = escolherItem(Totboy,Totboy.length)
                            vTempBoys.push(item)
                            Totboy = remover(item.nome,Totboy)
                        } else{ 
                            console.log("Reserva mulher")
                            item = escolherItem(Totgirl,Totgirl.length)
                            vTempGirls.push(item)
                            Totgirl = remover(item.nome,Totgirl)
                        }
                            reservasAdd++
                            reservas--
                    }while((i+1) == TotTimes && reservas > 0)
                }

                MediaTime = ((somarItens(vTempBoys) + somarItens(vTempGirls))/(vTempBoys.length + vTempGirls.length))
                desvioPadrao = MediaTotal - MediaTime
                
                if((desvioPadrao <= 0.5 && desvioPadrao >= -0.5) || contadorLoop >= maxLoop){
                    continua = false
                    vTempBoys.map((item)=>{
                        vTemp.push(item)
                    })
                    vTempGirls.map((item)=>{
                        vTemp.push(item)
                    })
                    vetor.push(vTemp)
                    if(vetorAcumulado.length > 0){
                        vetorAcumulado.map((item)=>{
                            vetor.push(item)
                        })
                    }
                    vetorAcumulado = vetor    
                    reservasAdd = 0
                }
                else{
                    vTempBoys.map((item)=>{ 
                        Totboy.push(item)
                    })
                    vTempGirls.map((item)=>{
                        Totgirl.push(item)
                    })
                    if(reservasAdd > 0)
                        reservas += reservasAdd
                    continua = true
                    contadorLoop++
                }
                

                vTempBoys = []
                vTempGirls = []
                vTemp = []
                vetor = []
            }while(continua) 
        }
        setTimes(vetorAcumulado)
    }

    const iniciarProcessoControlado = useCallback(async(isMounted,timioutId)=>{
        if(!isMounted.current) return

        try{
        const resultado = await Promise.race([
            embaralhar(),
            new Promise((_,reject)=>
                timioutId.current = setTimeout(()=> reject(new Error('A tarefa demorou de mais')),3000)
            ),
        ])

        clearTimeout(timioutId.current)

        if(isMounted.current){
            console.log(times)
        }
        return
        
        }catch(error){
           timioutId.current = setTimeout(()=>{iniciarProcessoControlado(isMounted,timioutId)},500)
        }
    },[embaralhar,times])

    useEffect(()=>{
        const isMounted = {current: true}
        const timioutId = {current: null}

        
        iniciarProcessoControlado(isMounted,timioutId)
        return()=>{
            isMounted.current = false
            clearTimeout(timioutId.current)
        }
        
    },[])

    const Bot=()=>{
        times.map((item)=>{
            item.push({pontos:0})
        })
        
        return (
            <div 
            className={`${style.button}`}
            onClick={()=>navigate('/placar',{state:{meustimes:times}})} 
            >
                <p>Iniciar partida</p>
            </div>
            
                
            
        ) 

    }
     console.log("Times:", times)
    return(
        <div className={`${style.cad_container}`}>
            {console.log(times)}
            {times.length>0 &&
                times.map((item,id)=>
                    <Ficha key={id} nome={item[0].nome} componentes={item}/>)
            }
            <div 
                
            >
            
                <Bot/>
            
            </div>
            <div
                style={{
                    marginBottom: "80px",
                }}
            >
                {}
            </div>
        </div>
    )
}