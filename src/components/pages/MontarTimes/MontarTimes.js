import { useEffect, useState } from 'react'
import style from './times.module.css'

import { FaFemale } from 'react-icons/fa';
import { FaMale } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi'
import { PiPencil } from 'react-icons/pi'
import LinkButton from '../../layout/LinkButton';
const Ficha = ({nome, nivel, genero,id,mark,cor})=>{
    if (cor){
        return(
            <div onClick={()=>{
                    mark(id)
                    // alterar()
                }}
                className={`${style.cardMark}`}>
                    <div>
                        {genero==="M"? <FaMale size={40}/>:<FaFemale size={40}/>}
                    </div>
                    <div>
                        <p>Nome: {nome}</p>
                        <p>Nível: {nivel}</p>
                    </div>
            </div>
        )
    }
    return(
        <div onClick={()=>{

                mark(id)
                // alterar()
            }}
            className={`${style.card}`}>
                <div>
                    {genero==="M"? <FaMale size={40}/>:<FaFemale size={40}/>}
                </div>
                <div>
                    <p>Nome: {nome}</p>
                    <p>Nível: {nivel}</p>
                </div>
        </div>
    )
}

export default function Times(){
    const [cadastros,setCadastros] = useState([])
    const [jogadorespresentes,setjogadorespresentes] = useState([])
    const [marcado,setMarcado] = useState(false)

    useEffect(()=>{
        const Lista = JSON.parse(localStorage.getItem('jogadores'))
        setCadastros(Lista)
        console.log(jogadorespresentes)
    },[jogadorespresentes])


    const Apagar = (i)=>{
        let NovoVetor = []
        jogadorespresentes.map((item)=>{
            if (item.nome != cadastros[i].nome){
                NovoVetor.push(item)
            }
        })
        setjogadorespresentes(NovoVetor)
    }

    const mark = (i)=>{
        if(busca(i)){
            Apagar(i)
            return
        }
        let v = []

        jogadorespresentes.map((item)=>{
            v.push(item)
        })
        v.push(cadastros[i])
        setjogadorespresentes(v)
    }

    const busca = (i)=>{
        const TAM = jogadorespresentes.length
        for(let j=0;j < TAM; j++){
            if(jogadorespresentes[j].nome == cadastros[i].nome){
                return true }
        } 
        return false
    }

    return(
        <section className={`${style.cad_container}`}>
            {cadastros? <p>Selecione os jogadores presentes</p>:<p>Nenhum cadastro encontrado, adicione seus jogadores em Cadastos</p>}
            {cadastros && 
                cadastros.map((jogador,index)=>
                {return (
                    <Ficha 
                        key={index}
                        id = {index}
                        nome={jogador.nome}
                        nivel={jogador.nivel}
                        genero={jogador.genero}
                        mark={mark}
                        cor={busca(index)}
                        />)})}
                        <div><LinkButton to={"/embaralhamento"} text={"Montar Times"} state={{jogadores:jogadorespresentes}}/></div>
                        
            <div
                style={{
                    marginBottom: "80px",
                }}
            >
                
                {}
            </div>
        </section>
    )
}