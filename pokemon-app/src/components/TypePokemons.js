import { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import './TypePokemons.css'
import image from '../ball.png'

function TypePokemons() {

  const [pokemons, setPokemons] = useState([])

  // Get type name from last segment of url 
  let type_name = window.location.href.split('/').pop()

  useEffect(() => {
    const getData = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/type/${type_name}/`)
    setPokemons([res.data])
    }
    getData()
  }, [])


  return (
    <div className="TypePokemons">
      <head>
        <link href="http://fonts.cdnfonts.com/css/pokemon-solid" rel="stylesheet"/> 
      </head>
      <form className="typePokemons_body" style={{margin: "auto", width: "50%", textAlign: "center"}}>
        <h3>{type_name.toUpperCase()} TYPE POKEMONS</h3>
        {(pokemons.length > 0) ? pokemons.map((item, key) => (
          <ul key={key}>
            {item.pokemon.map((pokemon, key) => (
                <li key={key}><img src={image}/><p style={{ transform: "translate(0, -220%)", fontSize: "26px" }}><Link style={{color: "#1a75ff", textDecoration: "none", webkitTextStroke: "1px white"}} to={`/pokemon/${pokemon.pokemon.name}`}>{pokemon.pokemon.name}</Link></p></li>
            ))}
          </ul>
        )) : <Loader type="Puff" color="#ff6666" style={{textAlign: "center"}}/> }
      </form>
    </div> 
    
  );
}

export default TypePokemons;
