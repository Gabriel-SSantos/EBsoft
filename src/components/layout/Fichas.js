import style from './styles/card.modules.css'
import { useNavigate } from 'react-router-dom'


// function navegar(rota,id){
//     const navigate = useNavigate()
//     navigate(`${rota}/${id}`)
// }

export const FichaAluno = ({nome, turma,id})=>{
    const navigate = useNavigate()
    return(
        <div className='card'
        onClick={()=>{
            navigate(`/alunos/${id}`)
        }}
        >
            <p>Nome: {nome}</p>
            <p>{turma}</p>
        </div>
    )
}

export const FichaProfessor = ({nome, turma,id})=>{
    const navigate = useNavigate()
    return(
        <div className='card'
        onClick={()=>{
            navigate(`/professores/${id}`)
        }}
        >
            <p>Nome: {nome}</p>
            <p>{turma}</p>
        </div>
    )
}


export const FichaTurma = ({nomeTurma,descricaoTurma,id})=>{
    const navigate = useNavigate()
    return(
        <div className='cardTurma'
            onClick={()=>{
                navigate(`/turmas/${id}`)
            }}>

            <p>Nome: {nomeTurma}</p>
            <p className='cardTurmaDescricao'>Descrição: {descricaoTurma}</p>
        </div>
    )
}

export const FichaAulaTurma = ({nomeTurma, situacao, aproveitamento})=>{
    return(
        <div className='card'>
            <p>Nome: {nomeTurma}</p>
            <div>
                <p>{situacao}</p>
                <p>{aproveitamento}</p>
            </div>
        </div>
    )
}


export default function Ficha({nome, turma, genero,id,edit,apagar})
    {
    return(
        <div className='card'>
                {/* <div>
                    {genero==="M"? <FaMale size={40}/>:<FaFemale size={40}/>}
                </div> */}
                <div>
                    <p>Nome: {nome}</p>
                    <p>Turma: {turma}</p>
                </div>
            {/* <div>
                <PiPencil 
                size={27} 
                style={{marginRight:"5px"}}
                onClick={()=>edit(id)}

                />
                <BiTrash size={27}
                onClick={()=>apagar(id)}
                />
            </div> */}
        </div>
    )
}
