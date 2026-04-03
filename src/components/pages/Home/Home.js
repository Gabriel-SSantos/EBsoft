import style from './home.module.css'
import LinkButton from '../../layout/LinkButton'
import { MdScoreboard } from 'react-icons/md'
import { BiPlus } from 'react-icons/bi'
import { useState,useEffect } from 'react'
import { getItens } from '../../../firebase/CRUD'
import BotaoCadastro from '../../Forms/BotaoCadastro'
import { FormAula } from '../../Forms/Cadastro'
import { FichaAula } from '../../layout/Fichas'
import { useAuth } from '../../../hooks/AuthContext'

function Home(){
    const {usuario} = useAuth()
    const [Aulas,setAulas] = useState([])
    const [cadastramento,setCadastramento] = useState(false)
    useEffect(()=>{
        const pegarAulas = (doc)=>{
 
            setAulas(doc)
        }
        console.log(usuario)
    
    if(usuario)
        getItens("aulas",pegarAulas,usuario?.idEscola)
   
    },[usuario])

    const ativarCadastramento = ()=>{
        setCadastramento(true)
    }
    const desativarCadastramento = ()=>{
        setCadastramento(false)
    }
            
    return (
        <section className={`${style.home_container}`}>
            <h3>Bem vindo(a) {usuario?.nome}, ao seu app de registro de EBD</h3>
                <section>
                    <div>
                        <h2>Aulas</h2>
                    </div>
                    {usuario?.perfil == 'adm' &&
                        <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                        <BotaoCadastro 
                            cadastramento={ativarCadastramento}
                            texto={"Nova Aula"}
                        />
                    </div>}
                    <div className={`${style.home_list}`}>
                        {cadastramento && <FormAula cadastramento={desativarCadastramento}/>}
                        {Aulas.length == 0 
                            && <p>Carregando aulas</p>}
                        {Aulas.length > 0 && 
                            Aulas.map((item,id)=>
                                <FichaAula
                                    key={id}
                                    id={item.id}  
                                    licao={"Lição " + item.licao}
                                    presentes={item.presencas}
                                    biblia={item.biblia}
                                    data={item.dataAula}
                                    revista={item.revista}
                                    situacao={item.situacao}
                                    aproveitamento={item.aproveitamento + "%"} 
                                />
                            )
                        }
                    </div>
                </section>
        </section>
    )
}

export default Home