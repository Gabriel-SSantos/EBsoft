import loading from "../../img/loading.svg"
import style from "./styles/loading.modules.css"

function Loading(){
    return(
        <div className={style.loader_container}>
            <img src={loading} alt="loading"/>
        </div>
    )
}

export default Loading