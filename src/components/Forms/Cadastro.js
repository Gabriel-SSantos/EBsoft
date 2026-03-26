import style from './cadastros.module.css'
import { use, useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import {addItem } from "../../firebase/CRUD"
import { getItens, getDocCollection,updateItem } from '../../firebase/CRUD'

export const salvar=({localstore,item})=>{
    return addItem(localstore,item)
}

function Selection({text,name,options,handleOnChange,value}){
    return(
        <div>
            <label>{text}  </label>
            <select
                className={`${style.option}`}
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value}
            >
                <option 
                    value={"Escolha uma turma"}>
                    Selecione uma opção
                </option>
                {
                   
                    options.map((option)=>(
                        <option 
                        value={option.id} key={option.id}> 
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
    <div className={`${style.envelope_box}`}>
        <div className={`${style.cad_box}`}>
            <div className={`${style.cabecalhoForm}`} >
                <BiX size={30} onClick={cadastramento}/>
                <p className={`${style.cabecalhoFormp}`}
                >Preencha o formulário para realizar a matrícula</p>
            </div>
            <div>
                <input 
                    type='text'
                    placeholder='Nome do aluno'
                    value={nome}
                    onChange={mudancaEstadoNome}
                />
                <div
                    style={{display:"flex",alignItems:"center",width:"100%", marginTop:'5px'}}
                >
                    <label
                        style={{fontSize: '15px'}}
                    >Masculino </label>
                    <input 
                            style={{width:'20px', margin:'4px'}}
                            value={"M"}
                            type='radio' 
                            name='genero'
                            onChange={mudancaEstadoGenero}/> 
                    <label
                        style={{fontSize: '15px'}}
                    >Feminino</label> 
                    <input 
                        value={"F"}
                        style={{width:'20px', margin:'4px'}}
                        type='radio' 
                        name='genero'
                        onChange={mudancaEstadoGenero}/>
                        
                </div>
                <div>
                    <label
                        style={{fontSize: '15px'}}
                    >Nascimento: 
                        <input
                            type='date'
                            placeholder='dd/mm/aa'
                            value={dataNascimento}
                            onChange={mudancaEstadoNascimento}
                        />
                    </label>
                </div>
                <div>
                    {
                        Selection(
                            {
                                name:"turmas",
                                text:"Turma: ",handleOnChange:mudancaEstadoTurma,
                                options:turmas,
                                value:turma
                            })
                    }
                </div>
            </div>
            {!edit && 
            <div className={`${style.button}`}
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
                    let atualizacao = {}
                    salvar({
                        item:aluno,
                        localstore:"alunos"
                    }).then((novoID)=>{
                        turmas.forEach((atualiza)=>{
                            if(atualiza.id == turma){
                                atualiza.alunos.push(novoID)
                                atualizacao = atualiza
                            }
                        })
                        updateItem(
                            "turmas",
                            turma,
                            atualizacao,
                        )
                    })
                }}>
                    <p>Salvar</p>
                </div>
            }
            {edit && 
            <div className={`${style.button}`}
                
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
                    ).then(()=>{
                        turmas.forEach((atualiza)=>{
                            
                            if(atualiza.id == turma){
                                atualiza.alunos.push(edit.id)
                            }
                        })
                        updateItem(
                            "turmas",
                            turma,
                            turmas,
                        )
                    })
                    
                
                }}
            ><p>Atualizar</p></div>
            }
        </div>
    </div>
    )
}


export function FormAula({cadastramento,edit}){

    const [licao,setLicao] = useState("")
    const [dataAula, setDataAula] = useState(Date)
    const [observacao,setObservacao] = useState("")
    const [turmasID, setTurmasID] = useState([])
    const [idsTurmas, setIdsTurmas] = useState({})
    const [idsTurmasAulas,setIdsTurmasAulas] = useState([])
    
    let attAula = {
        licao:licao,
        biblia: 0,
        revista: 0,
        presencas: 0,
        turmas:[],
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
        getDocCollection("turmas",setIdsTurmas)
        if(edit){
            setLicao(edit.licao)
            setObservacao(edit.obs)
            setDataAula(edit.data)
        }
    },[])

    const turmaAula = async (dataAula)=>{
        let dt = {
            dia: Number(dataAula[8] + dataAula[9]),
            mes:Number(dataAula[5] + dataAula[6]),
            ano:Number(dataAula[2] + dataAula[3]),
            trimestre: parseInt((Number(dataAula[5] + dataAula[6])/3) + 0.67)
        }
        const criacaoFichas = idsTurmas.map((element) => {
           return salvar({
                item:{
                    situacao: "aberta",
                    idTurma:element.id, 
                    nome:element.nome,
                    data: dt
                },
                localstore:"aulaTurma"
                })
        })
        
        const resposta = await Promise.all(criacaoFichas)
        return resposta
            
    }

    
    return(
    <div className={`${style.envelope_box}`}>
        <div className={`${style.cad_box}`}>
            <div className={`${style.cabecalhoForm}`} >
                <BiX size={30} onClick={cadastramento}/>
                <p className={`${style.cabecalhoFormp}`}
                >Nova Aula</p>
            </div>
            <div>
                <div>
                    <label>Lição:
                        <input 
                        type='text'
                        value={licao}
                        placeholder='Título da lição ou número'
                        onChange={mudancaEstadoLicao}
                        /> 
                    </label>
                </div>
                <div>
                    <label>Data da aula: 
                        <input
                            style={{textAlign:"center"}}
                            type='date'
                            value={dataAula}
                            placeholder='Data da aula'
                            onChange={mudancaEstadoData}
                        />
                    </label>
                </div>
                    <div>
                        <label>Observação: </label>
                        <input 
                        type='text'
                        placeholder='Deixe aqui observações quanto a esta aula'
                        value={observacao}
                        onChange={mudancaEstadoObs}/>
                    </div>
            </div>
            {!edit && 
            <div 
                className={`${style.button}`}
                
                onClick={async ()=>{
                    let ids = await turmaAula(dataAula)
                    cadastramento()
                    console.log(ids)
                    const aula = {
                        licao:licao,
                        dataAula:dataAula,
                        observacao: observacao,
                        oferta: 0,
                        biblia: 0,
                        revista: 0,
                        presencas: 0,
                        situacao: "aberta", 
                        turmas:ids
                    }
                    salvar({
                        item:aula,
                        localstore:"aulas"
                    })
                }}
                    
            >
                <p>Salvar</p>   
            </div>
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
    <div className={`${style.envelope_box}`}>
        <div className={`${style.cad_box}`}>
            <div className={`${style.cabecalhoForm}`} >
                <BiX size={30} onClick={cadastramento}/>
                <p className={`${style.cabecalhoFormp}`}
                >Preencha o formulário para realizar a matrícula</p>
            </div>
            <div>
                <div><label>Nome: <input 
                    type='text'
                    value={nome}
                    placeholder='Coloque o nome'
                    onChange={mudancaEstadoNome}
                    /></label></div>
                <div
                    style={{display:"flex",alignItems:"center",width:"100%", marginTop:'5px'}}
                >
                    <label
                        style={{fontSize: '15px'}}
                    >Masculino </label>
                    <input 
                            style={{width:'20px', margin:'4px'}}
                            value={"M"}
                            type='radio' 
                            name='genero'
                            onChange={mudancaEstadoGenero}/> 
                    <label
                        style={{fontSize: '15px'}}
                    >Feminino</label> 
                    <input 
                        value={"F"}
                        style={{width:'20px', margin:'4px'}}
                        type='radio' 
                        name='genero'
                        onChange={mudancaEstadoGenero}/>
                        
                </div>
                <div>
                    <label> Nascimento
                        <input
                            type='date'
                            value={dataNascimento}
                            onChange={mudancaEstadoNascimento}
                        />
                    </label>
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
                <div>
                    <label>Email:<input 
                    type='email'
                    placeholder='Digite o E-mail'
                    value={email}
                    onChange={mudancaEstadoEmail}
                    /> </label>
                    </div>
                <div><label>Senha: <input 
                    type='password'
                    placeholder='Digite a senha'
                    value={senha}
                    onChange={mudancaEstadoSenha}
                    /></label></div>
            </div>
            {!edit && 
            <div
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
                })}}>
                    <p>Salvar</p></div>
            }
            {edit && 
            <div
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
            ><p>Atualizar</p></div>
            }
            
        </div>
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
    <div className={`${style.envelope_box}`}>
        <div className={`${style.cad_box}`}>
            <div className={`${style.cabecalhoForm}`} >
                <BiX size={30} onClick={cadastramento}/>
                <p className={`${style.cabecalhoFormp}`}
                >Insira as informações da turma</p>
            </div>
            <div>
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
                        placeholder='Descrição da turma'
                        type='text'
                        value={descricao}
                        onChange={mudancaEstadoDescricao}
                    />
                </div>

                <div style={{display:"flex",justifyContent:"center"}}>
                {!edit &&
                    <div
                        className={`${style.button}`}
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
                    ><p>Salvar</p></div>}
                    {edit &&
                    <div       
                        className={`${style.button}`}                 
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
                    ><p>Atualizar</p></div>}
                </div>
            </div>
        </div>
    </div>
    )
}

