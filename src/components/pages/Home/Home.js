import style from './home.module.css'
import LinkButton from '../../layout/LinkButton'
import { MdScoreboard } from 'react-icons/md'
import { BiPlus } from 'react-icons/bi'
import { useState,useEffect } from 'react'
import { getItens } from '../../../firebase/CRUD'
import BotaoCadastro from '../../Forms/BotaoCadastro'
import { FormAula } from '../../Forms/Cadastro'
import { FichaAula } from '../../layout/Fichas'
function Home(){
    const [Aulas,setAulas] = useState([])
    const [cadastramento,setCadastramento] = useState(false)

    useEffect(()=>{
        return getItens("aulas",setAulas)
    },[])

    const ativarCadastramento = ()=>{
        setCadastramento(true)
    }
    const desativarCadastramento = ()=>{
        setCadastramento(false)
    }
            
    return (
        <section className={`${style.home_container}`}>
            <h3>Bem vindo ao seu app de registro de EBD</h3>
                <section>
                    <div>
                        <h2>Aulas</h2>
                    </div>
                    <div>
                        <BotaoCadastro 
                            cadastramento={ativarCadastramento}
                            texto={"Nova Aula"}
                        />
                    </div>
                    <div className={`${style.home_list}`}>
                        {cadastramento && <FormAula cadastramento={desativarCadastramento}/>}
                        {
                            Aulas.length == 0 
                            && <p>Carregando aulas</p>
                        }
                        {Aulas.length > 0 && 
                            Aulas.map((item,id)=>
                                <FichaAula
                                    key={id}
                                    id={item.id}  
                                    licao={"Lição " + item.licao}
                                    presentes={item.presencas}
                                    // aproveitamento={item.aproveitamento}
                                    biblia={item.biblia}
                                    data={item.dataAula}
                                    revista={item.revista}
                                    situacao={item.situacao} 
                                />
                            )
                        }
                    </div>
                </section>
        </section>
    )
}

export default Home