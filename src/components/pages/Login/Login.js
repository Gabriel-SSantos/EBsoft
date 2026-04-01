import style from './login.module.css'
import logo from "../../../img/logoTitulo.png"
import  FormLogin  from './FormLogin'

export  default function Login(){
    return(
        <div className={`${style.login}`} >
            <img 
                src={logo}
                width={"90%"}
            >
            </img>
            <FormLogin/>
        </div>
    )
}