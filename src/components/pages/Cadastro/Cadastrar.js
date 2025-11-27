import { useEffect, useState } from 'react'
import style from './cadastros.module.css'

import { FaFemale } from 'react-icons/fa';
import { FaMale } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi'
import { PiPencil } from 'react-icons/pi'
import Ficha,{FichaAluno} from '../../layout/Fichas';
import AddCadastro from './AddCadastro'
import { BotaoCadastro } from './AddCadastro';

import EditCadastro from './EditCadastro';

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
        localStorage.setItem('alunos',JSON.stringify(NovoVetor))
        setCadastros(NovoVetor)
    }

    useEffect(()=>{
        const Lista = JSON.parse(localStorage.getItem('alunos'))
        setCadastros(Lista)
    },[cadastrar,editavel])

    return(
        <section className={`${style.cad_container}`}>
            {cadastros? <p>Aqui estão seus cadastros</p>:<p>Nenhuma matrícula encontrada, matricule seus alunos</p>}
            <BotaoCadastro 
                cadastramento={ativarCadastramento}/>
            {cadastrar && <AddCadastro
            cadastramento={desativarCadastramento}/>}{editavel && <EditCadastro i={editIndex} editavel={desativarEdicao}/>}
            {cadastros && 
                cadastros.map((alunos,index)=>
                    (<FichaAluno
                        key={index}
                        id = {index}
                        nome={alunos.nome}
                        turma={alunos.turma}
                        // genero={alunos.genero}
                        // edit={indiceEdit}
                        // apagar={Apagar}
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