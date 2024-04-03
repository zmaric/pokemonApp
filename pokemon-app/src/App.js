import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Pokemons from './components/Pokemons'
import Pokemon from './components/Pokemon'
import './assets/styles/style.scss'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Pokemons />}/>
        <Route exact path="/pokemon/:id" element={<Pokemon />}/>
      </Routes>
    </Router>    
  );
}

export default App;
