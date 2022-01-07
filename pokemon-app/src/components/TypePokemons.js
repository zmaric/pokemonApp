import { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'

function TypePokemons() {

  const [pokemons, setPokemons] = useState([])

  // Get type name from last segment of url 
  let type_name = window.location.href.split('/').pop()


  useEffect(() => {
    const getData = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/type/${type_name}/`)
    setPokemons([res.data])
      // console.log(res.data)
    }
    getData()
  }, [])

  return (
    <div className="TypePokemons">
      <form className="typePokemons_body" style={{margin: "auto", width: "50%", textAlign: "center"}}>
        <h3 style={{fontFamily: "sans-serif", fontSize: "28px"}}>{type_name.toUpperCase()} TYPE POKEMONS</h3>
        {(pokemons.length > 0) ? pokemons.map((item, key) => (
          <div key={key}>
            {item.pokemon.map((pokemon, key) => (
                <p key={key} style={{fontFamily: "sans-serif", fontSize: "18px"}}><Link to={`/pokemon/${pokemon.pokemon.name}`}>{pokemon.pokemon.name}</Link></p>
            ))}
            
          </div>
        )) : <p>Loading...</p> }
      </form>
    </div> 
    
  );
}

export default TypePokemons;
