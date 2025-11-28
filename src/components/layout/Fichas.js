import style from './styles/card.modules.css'

export const FichaAluno = ({nome, turma})=>{
    return(
        <div className='card'>
            <p>Nome: {nome}</p>
            <p>Turma: {turma}</p>
        </div>
    )
}

export const FichaTurma = ({nomeTurma,descricaoTurma})=>{
    return(
        <div className='cardTurma'>
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
