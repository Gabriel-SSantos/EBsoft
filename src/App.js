import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BiBookOpen } from 'react-icons/bi';
import Home from './components/pages/Home/Home'
import Cadastrar from './components/pages/Cadastro/Cadastrar';
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Ranking from './components/pages/Ranking/Ranking';
import Padrao from './components/pages/Padrao';
import Turmas from './components/pages/Turmas/Turmas';
import TurmasView from './components/pages/Turmas/TurmasView';
import Alunos from './components/pages/Alunos/Alunos';
import AlunosView from './components/pages/Alunos/AlunosView';
import Professores from './components/pages/Professores/Professores';
import ProfessoresView from './components/pages/Professores/ProfessoresView';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useEffect, useState } from 'react';

function App() {

  const [user,setUser] = useState(null)
  useEffect(()=>{
    const auth = getAuth()
    const naoInscrito = onAuthStateChanged(auth,(usuarioFirebase)=>{
      if(usuarioFirebase){
        console.log("Usuário logado: ",usuarioFirebase.uid);
        setUser(usuarioFirebase);
      } else {
        console.log("Iniciando login anonimo ")
        signInAnonymously(auth).catch((erro)=>{
          console.error("Erro no login: ", erro)
        })
      }
    })
    return ()=> naoInscrito()
  },[])
  
  const AppHeader = ()=>{
    return(
      <div style={
        {
          padding: 10,
          backgroundColor:"#7488DA", 
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        }}>
          <BiBookOpen size={50}
            style={{marginRight:"10px"}}
          />
          <h1> 
          EBD Sistema</h1>
        </div>
    )
  }
  const AppLayout = ()=>{
    const location = useLocation();
    const rotasFull = ['/placar']
    const verificarRotas = rotasFull.includes(location.pathname)
    return (
      <div style={{
        display:"flex",
        flexDirection:"column",
        width:"100%",
        height:"100vh",
        overflow: "hidden"
      }}>
        {!verificarRotas && <AppHeader/>}
        <Container customClass='min-height'>
          <Routes>
            <Route exact path='/' Component={Home}></Route>
            <Route path='/turmas' Component={Turmas}></Route>
            <Route path='/turmas/:id' Component={TurmasView}></Route>
            <Route path='/alunos' Component={Alunos}></Route>
            <Route path='/alunos/:id' Component={AlunosView}></Route><Route path='/professores' Component={Professores}></Route>
            <Route path='/professores/:id' Component={ProfessoresView}></Route>
            <Route path='/cadastros' Component={Cadastrar}></Route>
            <Route path='/padrao' Component={Padrao}></Route>
            <Route exact path='/classificacoes' Component={Ranking}></Route>

          </Routes>
        </Container>
        {!verificarRotas && <Navbar/>}
      </div>
    )
  }

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
