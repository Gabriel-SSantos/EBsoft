import {Link} from 'react-router-dom'
import style from './styles/navbar.modules.css'
import { MdHome, MdPeople, } from "react-icons/md";
import { MdSchool } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { TbPresentationAnalytics } from 'react-icons/tb';
import { useAuth } from '../../hooks/AuthContext';
function Navbar(){
    const {usuario} = useAuth()
    // console.log(usuario)
    return(
        <nav className={`navbar`}>
                <ul className='list'>
                    <li className='item'> <Link to="/"> 
                    <MdHome size={30}/>
                    Inicio</Link></li>
                    {usuario?.perfil == 'adm'  && 
                    <><li className='item'> <Link to="/turmas"> 
                    <MdSchool size={30}/>
                    Turmas</Link></li>
                    <li className='item'> <Link to="/professores"> 
                    <GiTeacher size={30}/>
                    Professores</Link></li>
                    <li className='item'> <Link to="/geral"> 
                    <TbPresentationAnalytics size={30}/>
                    Geral</Link></li></>
                    }
                    {usuario?.perfil == 'prof' && 
                    <><li className='item'> <Link to={`/turmas/${usuario?.turma}`}> 
                    <MdSchool size={30}/>
                    Turma</Link></li>
                    <li className='item'> <Link to={`/professores/${usuario?.idProfAluno}`}> 
                    <GiTeacher size={30}/>
                    Minha ficha</Link></li>
                    </>
                    }
                    <li className='item'> <Link to="/alunos"> 
                    <MdPeople size={30}/>
                    Alunos</Link></li>
                </ul> 
        </nav>
    )
}

export default Navbar;