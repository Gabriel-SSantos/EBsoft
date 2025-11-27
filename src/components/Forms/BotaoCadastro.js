import style from './cadastros.module.css'

const BotaoCadastro=({cadastramento,texto})=>{
    return(
        <div 
            onClick={cadastramento}
            className={`${style.botao}`}>
            <p>{texto}</p>
        </div>
    )
}
export default BotaoCadastro