import style from './cadastros.module.css'
import { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import {addItem } from "../../firebase/CRUD"
import { getItens, getDocCollection,updateItem } from '../../firebase/CRUD'

const salvar=({localstore,item})=>{
    addItem(localstore,item)
}

function Selection({text,name,options,handleOnChange,value}){
    return(
        <div>
            <label>{text}  </label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value}
            >
                <options value={"Escolha uma turma"}>Selecione uma opção</options>
                
                {
                    options.map((option)=>(
                        <option value={option.id} key={option.id}> 
                            {option.nome}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export function FormAluno({cadastramento,edit}){

    const [nome,setNome] = useState("")
    const [genero,setGenero] = useState("")
    const [dataNascimento, setDataNascimento] = useState(Date)
    const [turma,setTurma] = useState("")
    const [turmaNome, setTurmaNome] = useState("")
    const [turmas, setTurmas] = useState([])
    

    const buscar = (key,lista)=>{
        const tam = lista.length
        console.log(lista)
        for(let i = 0; i < tam; i++){
            if(key == lista[i].id){
                console.log("Aqui")
                return lista[i].nome
            }
        }
    }
    let attAluno = {
        nome:"",
        genero:"",
        nascimento: Date(),
        turma: "",
        turmaNome: "",
        oferta: false,
        biblia: false,
        revista: false,
        presencas: 0,
        pontos: 0,
    }
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    const mudancaEstadoTurma = (e)=>{
        setTurma(e.target.value)
        setTurmaNome(buscar(e.target.value,turmas))
    }
    const mudancaEstadoNascimento = (e)=>{
        setDataNascimento(e.target.value)
    }
    const mudancaEstadoGenero = (e)=>{
        setGenero(e.target.value)
    }
    useEffect(()=>{
        if(edit){
            setTurma(edit.turma)
            setTurmaNome(edit.turmaNome)
            setNome(edit.nome)
            setDataNascimento(edit.nascimento)
            setGenero(edit.genero)

        }
        getDocCollection("turmas",setTurmas)
    },[])

    return(
    <div className={`${style.cad_box}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para realizar a matrícula</p><BiX size={30} onClick={cadastramento}/></div>
        
        <div><p>Nome: </p><input 
            type='text'
            value={nome}
            onChange={mudancaEstadoNome}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"100%"}}
        ><p>Gênero:</p><p style={{marginLeft:"4px"}}>Masculino</p><input 
                value={"M"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /> 
            <p>Feminino </p><input 
                value={"F"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /></div>
        <div>
            <input
                type='date'
                value={dataNascimento}
                onChange={mudancaEstadoNascimento}
            />
        </div>

        <div>
            {
                Selection(
                    {
                        name:"turmas",
                        text:"turmas",handleOnChange:mudancaEstadoTurma,
                        options:turmas,
                        value:turma
                    })
            }
            </div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        {!edit && 
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                cadastramento()
                const aluno = {
                    nome:nome,
                    genero:genero,
                    nascimento: dataNascimento,
                    turma: turma,
                    turmaNome: turmaNome,
                    oferta: false,
                    biblia: false,
                    revista: false,
                    presencas: 0,
                    pontos: 0,
                }
                salvar({
                    item:aluno,
                    localstore:"alunos"
                })}}
        >Salvar</button>
        }
        {edit && 
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                cadastramento()
                attAluno.nome = nome
                attAluno.turma = turma
                attAluno.turmaNome = turmaNome
                attAluno.genero = genero
                attAluno.nascimento = dataNascimento
                updateItem(
                    "alunos",
                    edit.id,
                    attAluno,
                )}}
        >Atualizar</button>
        }
    </div>
    )
}


export function FormAula({cadastramento,edit}){

    const [licao,setLicao] = useState("")
    const [dataAula, setDataAula] = useState(Date)
    const [observacao,setObservacao] = useState("")
    
    let attAula = {
        licao:"",
        genero:"",
        nascimento: Date(),
        biblia: 0,
        revista: 0,
        presencas: 0,
        situacao: "aberta",
    }
    const mudancaEstadoLicao = (e)=>{
        setLicao(e.target.value)
    }
    const mudancaEstadoObs = (e)=>{
        setObservacao(e.target.value)
    }
    const mudancaEstadoData = (e)=>{
        setDataAula(e.target.value)
    }
   
    useEffect(()=>{
        if(edit){
            setLicao(edit.licao)
            setObservacao(edit.obs)
            setDataAula(edit.data)
        }
    },[])

    return(
    <div className={`${style.cad_box}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para realizar a matrícula</p><BiX size={30} onClick={cadastramento}/></div>
        
        <div><p>Lição: </p><input 
            type='text'
            value={licao}
            onChange={mudancaEstadoLicao}
            /></div>
        <div>
            <input
                type='date'
                value={dataAula}
                onChange={mudancaEstadoData}
            />
        </div>
        <div><p>Observação: </p><input 
            type='text'
            value={observacao}
            onChange={mudancaEstadoObs}
            /></div>
        <div></div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        {!edit && 
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                cadastramento()
                const aula = {
                    licao:licao,
                    dataAula:dataAula,
                    observacao: observacao,
                    oferta: 0,
                    biblia: 0,
                    revista: 0,
                    presencas: 0,
                    situacao: "aberta",
                }
                salvar({
                    item:aula,
                    localstore:"aulas"
                })}}
        >Salvar</button>
        }
        {edit && 
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                cadastramento()
                updateItem(
                    "aulas",
                    edit.id,
                    attAula,
                )}}
        >Atualizar</button>
        }
    </div>
    )
}

export const FormProfessor=({cadastramento, edit})=>{
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [nome,setNome] = useState("")
    const [genero,setGenero] = useState("")
    const [dataNascimento, setDataNascimento] = useState(Date)
    const [turma,setTurma] = useState("")
    const [turmaNome, setTurmaNome] = useState("")
    const [turmas, setTurmas] = useState([])
    

    const buscar = (key,lista)=>{
        const tam = lista.length
        console.log(lista)
        for(let i = 0; i < tam; i++){
            if(key == lista[i].id){
                console.log("Aqui")
                return lista[i].nome
            }
        }
    }
    let attProf = {
        nome:"",
        genero:"",
        nascimento: Date(),
        turma: "",
        turmaNome: "",
        oferta: false,
        biblia: false,
        revista: false,
        email: "",
        senha: "",
        presencas: 0,
        pontos: 0,
    }
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    const mudancaEstadoTurma = (e)=>{
        setTurma(e.target.value)
        setTurmaNome(buscar(e.target.value,turmas))
    }
    const mudancaEstadoNascimento = (e)=>{
        setDataNascimento(e.target.value)
    }
    const mudancaEstadoGenero = (e)=>{
        setGenero(e.target.value)
    }
    const mudancaEstadoSenha = (e)=>{
        setSenha(e.target.value)
    }
    const mudancaEstadoEmail = (e)=>{
        setEmail(e.target.value)
    }
    
    useEffect(()=>{
        if(edit){
            setTurma(edit.turma)
            setTurmaNome(edit.turmaNome)
            setNome(edit.nome)
            setDataNascimento(edit.nascimento)
            setGenero(edit.genero)
            setEmail(edit.email)
            setSenha(edit.senha)

        }
        getDocCollection("turmas",setTurmas)
    },[])

    return(
    <div className={`${style.cad_box}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para realizar a matrícula</p><BiX size={30} onClick={cadastramento}/></div>
        
        <div><p>Nome: </p><input 
            type='text'
            value={nome}
            onChange={mudancaEstadoNome}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"100%"}}
        ><p>Gênero:</p><p style={{marginLeft:"4px"}}>Masculino</p><input 
                value={"M"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /> 
            <p>Feminino </p><input 
                value={"F"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /></div>
        <div>
            <input
                type='date'
                value={dataNascimento}
                onChange={mudancaEstadoNascimento}
            />
        </div>

        <div>
            {
                Selection(
                    {
                        name:"turmas",
                        text:"turmas",handleOnChange:mudancaEstadoTurma,
                        options:turmas,
                        value:turma
                    })
            }
            </div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        <div><p>Email: </p><input 
            type='email'
            value={email}
            onChange={mudancaEstadoEmail}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        <div><p>Senha: </p><input 
            type='password'
            value={senha}
            onChange={mudancaEstadoSenha}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"50%"}}
        ></div>
        {!edit && 
        <button type='button'
        className={`${style.button}`}
        
        onClick={()=>{
           
            cadastramento()
            const professor = {
                nome:nome,
                genero:genero,
                nascimento: dataNascimento,
                turma: turma,
                turmaNome:turmaNome,
                email:email,
                senha:senha,
                oferta: false,
                biblia: false,
                revista: false,
                presencas: 0,
                pontos: 0,
            }
            salvar({
                item:professor,
                localstore:"professores"
            })}}>Salvar</button>
        }
        {edit && 
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                cadastramento()
                attProf.nome = nome
                attProf.turma = turma
                attProf.turmaNome = turmaNome
                attProf.genero = genero
                attProf.nascimento = dataNascimento
                attProf.email = email
                attProf.senha = senha
                updateItem(
                    "professores",
                    edit.id,
                    attProf,
                )}}
        >Atualizar</button>
        }
    </div>
    )
}

export default function FormTurma({cadastramento,edit}){
    const [nome,setNome] = useState("")
    const [descricao,setDescricao] = useState("")
    const mudancaEstadoDescricao = (e)=>{
        setDescricao(e.target.value)
    }
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    let attTurma = {
        nome: "",
        descricao: "",
        professor: "",
        alunos: [],
    }
    useEffect(()=>{
        if(edit){
            setNome(edit.nome)
            setDescricao(edit.descricao)
            attTurma.alunos = edit.alunos
            attTurma.professor = edit.professor  
        }
    },[])
    
    return(
    <div className={`${style.cad_box}`}>
        <div>
            <div style={{margin:"0", display:"flex",justifyContent:"flex-end"}}>
                <BiX size={30} onClick={cadastramento}/>
            </div>
            <div style={{marginTop:"0", textAlign:"center"}}>
                <p>Faça o cadastro de uma nova turma</p>
            </div>
        </div>
        <div className={`${style.formSection}`}>
            <div>
                <p>Nome: </p>
                <input 
                    placeholder='Insira o Nome da Turma'
                    type='text'
                    value={nome}
                    onChange={mudancaEstadoNome}
                />
            </div><div>
                <p>Descrição: </p>
                <input 
                    placeholder='Insira o Nome da Turma'
                    type='text'
                    value={descricao}
                    onChange={mudancaEstadoDescricao}
                />
            </div>

            <div style={{display:"flex",justifyContent:"center"}}>
               {!edit &&
                <button type='button'
                    
                    onClick={()=>{
                        if(nome.length < 1){
                            alert("Preencha o nome")
                            return
                        }
                        const turma = {
                            nome:nome,
                            descricao:descricao,
                            professor: "",
                            alunos: [],
                        }
                        cadastramento()
                        salvar({
                            localstore:"turmas",
                            item:turma,
                        })
                    }}
                >Salvar</button>}
                {edit &&
                <button type='button'
                    onClick={()=>{
                        if(nome.length < 1){
                            alert("Preencha o nome")
                            return
                        }
                        
                        attTurma.nome = nome
                        attTurma.descricao = descricao
                        updateItem("turmas",edit.id,attTurma)
                        cadastramento()
                    }}
                >Atualizar</button>}
            </div>
        </div>
    </div>
    )
}

