import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaVolleyball } from 'react-icons/fa6'
import Home from './components/pages/Home/Home'
import Cadastrar from './components/pages/Cadastro/Cadastrar';
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Ranking from './components/pages/Ranking/Ranking';
import Placar from './components/pages/Placar/Placar'
import PlacarConfig from './components/pages/Placar/PlacarConfig';
import Vencedor from './components/pages/Placar/Vencedor';
import Padrao from './components/pages/Padrao';
import Times from './components/pages/MontarTimes/MontarTimes';
import Embaralhamento from './components/pages/MontarTimes/Embaralhamento';

function App() {

  const AppHeader = ()=>{
    return(
      <div style={
        {
          padding: 10,
          backgroundColor:"#FFDD00", 
          display:"flex",
          alignItems:"center", 
          justifyContent:"center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        }}>
          <h1>
          <FaVolleyball size={50}
            style={{marginRight:"10px"}}
          />
          Voleando</h1>
        </div>
    )
  }
  const AppLayout = ()=>{
    const location = useLocation();
    const rotasFull = ['/placar']
    const verificarRotas = rotasFull.includes(location.pathname)
    return (
      <>
        {!verificarRotas && <AppHeader/>}
        <Container customClass='min-height'>
          <Routes>
            <Route exact path='/' Component={Home}></Route>
            <Route path='/placar' Component={Placar}></Route>
            <Route path='/placarconfig' Component={PlacarConfig}></Route>
            <Route path='/placarvencedor' Component={Vencedor}></Route>
            <Route path='/cadastros' Component={Cadastrar}></Route>
            <Route path='/times' Component={Times}></Route>

            <Route path='/embaralhamento' Component={Embaralhamento}></Route>
            <Route exact path='/classificacoes' Component={Ranking}></Route>

          </Routes>
        </Container>
        {!verificarRotas && <Navbar/>}
      </>
    )
  }

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
