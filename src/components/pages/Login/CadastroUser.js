import style from './login.module.css'
import logo from "../../../img/logo.png"
import  FormCadastro  from './FormCadastro'

export  default function CadastroUser(){
    return(
        <div className={`${style.login}`} >
            <img 
                src={logo}
                width={"10%"}
            >
            </img>
            <FormCadastro/>
        </div>
    )
}