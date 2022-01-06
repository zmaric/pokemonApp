import { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'

function Pokemon() {

  const [pokemonData, setPokemonData] = useState([])

  // Get name of pokemon from last segment of url 
  let pokemon_name = window.location.href.split('/').pop()

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}/`)
      setPokemonData([res.data])
    //   console.log(res.data)
    }

    getData()
  }, [])

  return (
    <div className="Pokemon">
      <div>
        <Link to="/">
          <button style={{margin: "0 200px"}}>Back to homepage</button>
        </Link>
      </div>
      <form style={{margin: "auto", width: "60%", textAlign: "center"}}>
        <h3>Pokemon data page</h3>
        {(pokemonData.length > 0) ? pokemonData.map((item, key) => (
          <div key={key}>
            <p>{item.name}</p>
            <p>{item.weight}</p>
            <img src={item.sprites.back_default}/>
            <img src={item.sprites.front_default}/>
          </div>
        )) : <p>Loading...</p> }
      </form>
    </div> 
  );
}

export default Pokemon;
