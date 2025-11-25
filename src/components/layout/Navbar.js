import {Link} from 'react-router-dom'
import style from './styles/navbar.modules.css'
import Container from './Container';
import Logo from '../../img/costs_logo.png'
import { MdHome, MdPeople, MdEmojiEvents, MdLeaderboard,MdScoreboard } from "react-icons/md";
function Navbar(){
    return(
        <nav className={`navbar${""}`}>
           <Container>
                {/* <Link to={"/"}>
                    <img src={Logo} alt='costs'></img>
                </Link> */}
                <ul className='list'>
                    <li className='item'> <Link to="/"> 
                    <MdHome size={30}/>
                    Inicio</Link></li>
                    <li className='item'> <Link to="/placarconfig">
                    <MdScoreboard size={30}/>
                    Placar</Link> </li>
                    <li className='item'> <Link to="/cadastros">
                    <MdPeople size={30}/>
                    Cadastros</Link></li> 
                    <li className='item'>
                     <Link to="/classificacoes">
                     <MdLeaderboard size={30}/>
                     Ranking</Link></li>
                </ul> 
           </Container>
        </nav>
    )
}

export default Navbar;