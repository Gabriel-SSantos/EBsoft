import style from './home.module.css'
import LinkButton from '../../layout/LinkButton'
import { MdScoreboard } from 'react-icons/md'
import { FaPeopleGroup } from 'react-icons/fa6'
import { BiPlus } from 'react-icons/bi'
import { TbTrophy } from 'react-icons/tb'
import { TbPlayVolleyball } from 'react-icons/tb'
function Home(){
    return (
        <section className={`${style.home_container}`}>
            <h3>Bem vindo ao seu app de registro de EBD</h3>
            <div id={`${style.buttons}`}>
                <div>
                    {/* <LinkButton to="/padrao" text="Começar Novo Jogo">
                        <TbPlayVolleyball size={50} color='#252a30'/>
                    </LinkButton> */}
                </div>
            </div>
        </section>
    )
}

export default Home