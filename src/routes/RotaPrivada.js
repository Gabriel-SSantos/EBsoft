import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export default function RotaPrivada({children, perfisPermitidos}){
    const {usuario, carregando} = useAuth()
    
   if(carregando){
    return(
        <div>
            <p>Preprando a tela...</p>
        </div>
    )
   }
    if(!usuario){
        return <Navigate to={"/login"} replace/>
    }
    if(perfisPermitidos && !perfisPermitidos.includes(usuario.perfil)){
         return <Navigate to={"/"} replace/>
    }
    return children;
}