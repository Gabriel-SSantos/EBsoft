import style from './styles/card.modules.css'
import { useNavigate } from 'react-router-dom'
import { BiBible } from 'react-icons/bi'
import { BiBook } from 'react-icons/bi'
import { FaCoins } from 'react-icons/fa'
import { BsStarFill } from 'react-icons/bs'


export const FichaAluno = ({aluno,nome, turma,id})=>{
    const navigate = useNavigate()
    return(
        <div className='card'
        onClick={()=>{
            navigate(`/alunos/${id}`,{state:aluno})
        }}
        >
            <p>{nome}</p>
            <p> - {turma}</p>
        </div>
    )
}

export const FichaAlunoChamada = ({nome, id,marcarBiblia,marcarRevista,marcarOferta,marcarPonto,biblia,pontos,revista,oferta,marcarPresenca,presenca})=>{
    const siz = 25
    return(
        <div className='card'
        style={{borderColor: presenca ? "blue":"#FFF"}}
        >
           <div onClick={()=>{
                marcarPresenca(id)
        }}><p >{nome}</p></div> 
            <div className='cardAlunoChamada'>
                <div
                    onClick={()=>{
                        
                        marcarBiblia(id)
                    }}
                >
                    <BiBible size={siz} color={biblia? 'brown':'black'}/>
                    <p>Bíblia</p>
                </div>
                <div
                    onClick={()=>{
                        
                        marcarRevista(id)
                    }}
                >
                    <BiBook size={siz} color={revista? 'blue':'black'} />
                    <p>Revista</p>
                </div>
                <div
                    onClick={()=>{
                        
                        marcarOferta(id)
                    }}
                >
                    <FaCoins size={siz} color={oferta? 'orange':'black'} />
                    <p>Oferta</p>
                </div>
                 <div
                    onClick={()=>{
                        
                        marcarPonto(id)
                    }}
                 >
                    <BsStarFill size={siz} color={pontos > 0? 'yellow':'black'}/>
                    <p>Pontos</p>
                </div>
            </div>

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


export const FichaRelatorio = ({trimestre,id})=>{
    const navigate = useNavigate()
    return(
        <div className='cardRelatorio'
            // onClick={()=>{
            //     navigate(`/geral/${id}`)
            // }}
            >

            <p>Relatorio: {trimestre}</p>
        </div>
    )
}

export const FichaAulaTurma = ({nomeTurma, situacao, aproveitamento,id})=>{
    const navigate = useNavigate()
    return(
        <div 
            style={{backgroundColor: situacao == "fechada"? "#deffc1":"#feffc1"}}
            className='card_aula_turma'
            onClick={()=>{
                navigate(`/aulachamada/${id}`)
            }}
        >
            <p>{nomeTurma}</p>
            <div>
                <p>{situacao}</p>
            </div>
        </div>
    )
}

export const FichaAula = ({licao, data, situacao, presentes, revista,biblia,aproveitamento,id})=>{
    const navigate = useNavigate()
    let dataModificada = data.split("-").reverse().join("/")
    
    return(
        <div 
        style={{backgroundColor: situacao == "fechada"? "#deffc1":"#feffc1"}}
        className='card_aula'
            onClick={()=>{
                navigate(`/aula/${id}`)
            }}
        >
            <div><p>{situacao}</p></div>
            <div>
                <h3>{licao} - {dataModificada}</h3>
            </div>
            <div>
                <p>Presentes: {presentes}</p>
                <p>Revistas: {revista}</p>
                <p>Bíblias: {biblia}</p>
                <p>Aproveitamento: {aproveitamento}</p>
            </div>
        </div>
    )
}

export default function Ficha({nome, turma, genero,id,edit,apagar})
    {
    return(
        <div className='card'>
                <div>
                    <p>Nome: {nome}</p>
                    <p>Turma: {turma}</p>
                </div>
        </div>
    )
}
