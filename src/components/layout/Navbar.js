import {Link} from 'react-router-dom'
import style from './styles/navbar.modules.css'
import Container from './Container';
import { MdHome, MdPeople, } from "react-icons/md";
import { MdSchool } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { TbPresentationAnalytics } from 'react-icons/tb';
function Navbar(){
    return(
        <nav className={`navbar${""}`}>
           <Container>
                <ul className='list'>
                    <li className='item'> <Link to="/"> 
                    <MdHome size={30}/>
                    Inicio</Link></li>
                    <li className='item'> <Link to="/turmas"> 
                    <MdSchool size={30}/>
                    Turmas</Link></li>
                    <li className='item'> <Link to="/padrao"> 
                    <MdPeople size={30}/>
                    Alunos</Link></li>
                    <li className='item'> <Link to="/padrao"> 
                    <GiTeacher size={30}/>
                    Professores</Link></li>
                    <li className='item'> <Link to="/padrao"> 
                    <TbPresentationAnalytics size={30}/>
                    Geral</Link></li>
                </ul> 
           </Container>
        </nav>
    )
}

export default Navbar;