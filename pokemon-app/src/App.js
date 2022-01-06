import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AllPokemons from './components/AllPokemons'
import Pokemon from './components/Pokemon'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AllPokemons/>}/>
        <Route exact path="/pokemon/:id" element={<Pokemon/>}/>
      </Routes>
    </Router>    
  );
}

export default App;
