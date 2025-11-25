import style from './styles/message.module.css'
import {useState, useEffect} from 'react'

function Message({type, msg}){
    const [viseble, setVisible] = useState(false)
    useEffect(()=>{
        if(!msg){
            setVisible(false)
            return
        }
        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000);
        
        return () => clearTimeout(timer)

    },[msg])
    return(
        <>
            (viseble && 
            <div className={`${style.message} ${style[type]}`}>{msg}</div>)
        </>
    )
}

export default Message