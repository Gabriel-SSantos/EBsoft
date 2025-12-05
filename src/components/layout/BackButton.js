import { useNavigate } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
const BackButton=()=>{
    const navigate = useNavigate()
    return(
        <BiArrowBack
            onClick={()=>navigate(-1)}
            size={30}
        />
    )
}
export default BackButton