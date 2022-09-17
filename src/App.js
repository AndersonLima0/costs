import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Company from './pages/Company';
import NewProject from './pages/NewProject';
import Projects from './pages/Projects';  

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'


function App() {
  return (
    
  <Router>
    <Navbar/>
    <Container customClass='min-heigth'>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/projects" element={ <Projects />} />
        <Route path="/company" element={ <Company />} />
        <Route path="/contact" element={ <Contact />} />
        <Route path="/newproject" element={ <NewProject />} />
      </Routes>
    </Container>
    <Footer/>
  </Router>
 
  );
}

export default App;
