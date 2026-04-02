import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BiBookOpen } from 'react-icons/bi';
import Home from './components/pages/Home/Home'
// import Cadastrar from './components/pages/Cadastro/Cadastrar';
import Navbar from './components/layout/Navbar'
import Header from './components/layout/Header';
import Container from './components/layout/Container'
import Ranking from './components/pages/Ranking/Ranking';
import Padrao from './components/pages/Padrao';
import Turmas from './components/pages/Turmas/Turmas';
import TurmasView from './components/pages/Turmas/TurmasView';
import ListaTurmas from './components/pages/Aulas/ListaTurmas'
import Alunos from './components/pages/Alunos/Alunos';
import AlunosView from './components/pages/Alunos/AlunosView';
import Professores from './components/pages/Professores/Professores';
import ProfessoresView from './components/pages/Professores/ProfessoresView';
import AulaChamada from './components/pages/Aulas/AulaChamada';
import RelatorioDetalhado from './components/pages/Aulas/RelatorioDetalhado';
import Geral from './components/pages/Geral/Geral'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useEffect, useState } from 'react';
import RelatorioMensal from './components/pages/Geral/RelatorioMensal';
import Login from './components/pages/Login/Login';
import CadastroUser from './components/pages/Login/CadastroUser';
import RotaPrivada from './routes/RotaPrivada';
import { AuthProvider, useAuth } from './hooks/AuthContext';

function App() {

  const [user,setUser] = useState(null)
  useEffect(()=>{
    const auth = getAuth()
 
    // return ()=> naoInscrito()
  },[])
  
  
  const AppLayout = ()=>{
    const location = useLocation();
    const rotasFull = ['/login','/cadastro']
    const verificarRotas = rotasFull.includes(location.pathname)
    return (
       <AuthProvider>
        <div style={{
          display:"flex",
          flexDirection:"column",
          width:"100%",
          height:"100vh",
          overflow: "hidden"
        }}>
          {!verificarRotas && <Header/>}
        
            <Container customClass='min-height'>
              <Routes>
                <Route exact path='/' Component={Home}></Route>
                <Route path='/turmas' element={
                  <RotaPrivada children={<Turmas/>} perfisPermitidos={['adm']}/>
                }></Route>
                <Route path='/turmas/:id' Component={TurmasView}></Route>
                <Route path='/aula/:id' Component={ListaTurmas}></Route>
                <Route path='/aulachamada/:id' Component={AulaChamada}></Route>
                <Route path='/alunos' Component={Alunos}></Route>
                <Route path='/alunos/:id' Component={AlunosView}></Route><Route path='/professores' element={
                  <RotaPrivada children={<Professores/>} perfisPermitidos={['adm']}/>
                }></Route>
                <Route path='/professores/:id' Component={ProfessoresView}></Route>
                <Route exact path='/relatorio' Component={RelatorioDetalhado}></Route>
                <Route exact path='/geral' Component={Geral}></Route>
                <Route exact path='/relatoriomensal' element={
                  <RotaPrivada children={<RelatorioMensal/>} perfisPermitidos={['adm']}/>
                }></Route>
                <Route exact path='/login' Component={Login}></Route>
                <Route exact path='/cadastro' Component={CadastroUser}></Route>

              </Routes>
            </Container>
        
          {!verificarRotas && <Navbar/>}
        </div>
      </AuthProvider>
    )
  }

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
