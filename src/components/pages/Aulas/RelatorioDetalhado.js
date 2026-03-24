import { useLocation } from "react-router-dom"

export default function RelatorioDetalhado(){
    const location = useLocation()
    const turmas = location.state?.listaTurmas
    const geral = location.state?.geral
    console.log(geral)
    return (
        <div>
            Relatorio aqui ooo 
        </div>
    )
}