import style from './styles/linkbutton.module.css'
import { Link } from "react-router-dom"
function LinkButton({to, text,children, state}){
    return(
        <Link className={style.btn} to={to} state={state}>
            {children}
            <span>{text}</span>
        </Link>
    )
}

export default LinkButton;