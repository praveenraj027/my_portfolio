import './App.css';
import './index.css';
import Portfolio from './components/Portfolio';
import Skill from './components/Skill';
import Project from './components/Project';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Portfolio />
      <Skill />
      <Project />
      <Contact />
    </>
  );
}

export default App;
