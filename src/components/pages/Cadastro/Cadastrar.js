import { useEffect, useState } from 'react'
import style from './cadastros.module.css'

import { FaFemale } from 'react-icons/fa';
import { FaMale } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi'
import { PiPencil } from 'react-icons/pi'

import AddCadastro from './AddCadastro'
import { BotaoCadastro } from './AddCadastro';

import EditCadastro from './EditCadastro';

const Ficha = ({nome, nivel, genero,id,edit,apagar})=>{
    return(
        <div className={`${style.card}`}>
                <div>
                    {genero==="M"? <FaMale size={40}/>:<FaFemale size={40}/>}
                </div>
                <div>
                    <p>Nome: {nome}</p>
                    <p>Nível: {nivel}</p>
                </div>
            <div>
                <PiPencil 
                size={27} 
                style={{marginRight:"5px"}}
                onClick={()=>edit(id)}

                />
                <BiTrash size={27}
                onClick={()=>apagar(id)}
                />
            </div>
        </div>
    )
}


export default function Cadastrar(){
    const [cadastros,setCadastros] = useState()
    const [cadastrar,setCadastrar] = useState(false)
    const [editavel,setEditavel] = useState(false)
    const [editIndex,setEditIndex] = useState(-1)
    const ativarCadastramento = ()=>{
        setCadastrar(true)
    }
    const desativarCadastramento = ()=>{
        setCadastrar(false)
    }
    
    const desativarEdicao = ()=>{
        setEditavel(false)
    }
    const indiceEdit=(i)=>{
        setEditIndex(i)
        setEditavel(true)
    }

    const Apagar = (i)=>{
        let NovoVetor = []
        cadastros.map((intem,index)=>{
            if (index != i){
                NovoVetor.push(intem)
            }
        })
        localStorage.setItem('jogadores',JSON.stringify(NovoVetor))
        setCadastros(NovoVetor)
    }

    useEffect(()=>{
        const Lista = JSON.parse(localStorage.getItem('jogadores'))
        setCadastros(Lista)
    },[cadastrar,editavel])

    return(
        <section className={`${style.cad_container}`}>
            {cadastros? <p>Aqui estão seus cadastros</p>:<p>Nenhum cadastro encontrado, adicione seus jogadores</p>}
            <BotaoCadastro 
                cadastramento={ativarCadastramento}/>
            {editavel && <EditCadastro i={editIndex} editavel={desativarEdicao}/>}
            {cadastrar && <AddCadastro
            cadastramento={desativarCadastramento}/>}
            {cadastros && 
                cadastros.map((jogador,index)=>
                    (<Ficha 
                        key={index}
                        id = {index}
                        nome={jogador.nome}
                        nivel={jogador.nivel}
                        genero={jogador.genero}
                        edit={indiceEdit}
                        apagar={Apagar}
                        />))}
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