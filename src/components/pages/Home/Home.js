import style from './home.module.css'
import savings from '../../../img/savings.svg'
import LinkButton from '../../layout/LinkButton'
import { MdScoreboard } from 'react-icons/md'
import { FaPeopleGroup } from 'react-icons/fa6'
import { BiPlus } from 'react-icons/bi'
import { TbTrophy } from 'react-icons/tb'
import { TbPlayVolleyball } from 'react-icons/tb'
function Home(){
    return (
        <section className={`${style.home_container}`}>
            <h3>Bem vindo ao seu app de organização de vôlei</h3>
            <p>Aqui você tem as melhores ferramentas para melhorar seu jogo, por onde deseja começar?</p>
            <div id={`${style.buttons}`}>
                <div>
                    <LinkButton to="/placarconfig" text="Usar o placar">
                        <MdScoreboard size={50} color='#252a30'/>
                    </LinkButton>
                    <LinkButton to="/times" text="Montar times">
                        <FaPeopleGroup size={50} color='#252a30'/>
                    </LinkButton>
                </div>
                <div>
                    <LinkButton to="/cadastros" text="Cadastrar Jogadores">
                        <BiPlus size={50} color='#252a30'/>
                    </LinkButton>
                    <LinkButton to="/classificacoes" text="Ver os melhores">
                        <TbTrophy size={50} color='#252a30'/>
                    </LinkButton>
                </div>
                <div>
                    <LinkButton to="/padrao" text="Começar Novo Jogo">
                        <TbPlayVolleyball size={50} color='#252a30'/>
                    </LinkButton>
                </div>
            </div>
        </section>
    )
}

export default Home