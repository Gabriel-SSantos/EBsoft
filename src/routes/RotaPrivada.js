import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export default function RotaPrivada({children, perfisPermitidos}){
    const {usuario} = useAuth()
    console.log(usuario)
   
    if(!usuario){
        return <Navigate to={"/login"} replace/>
    }
    if(perfisPermitidos && !perfisPermitidos.includes(usuario.perfil)){
         return <Navigate to={"/"} replace/>
    }
    return children;
}