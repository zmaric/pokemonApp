import { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './Pokemon.css'

function Pokemon() {

  const [pokemonData, setPokemonData] = useState([])

  // Get name of pokemon from last segment of url 
  let pokemon_name = window.location.href.split('/').pop()

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}/`)
      setPokemonData([res.data])
      console.log(res.data)
    }

    getData()
  }, [])

  return (
    <div className="Pokemon">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Allerta Stencil' rel='stylesheet'/>
      </head>
      <div>
        <Link to="/">
          <button style={{margin: "0 200px"}}>Back to homepage</button>
        </Link>
      </div>
      {(pokemonData.length > 0) ? pokemonData.map((item, key) => (
        <div key={key}>
          <div className="pokemonDataDiv">
            <div className="left">
              <img style={{width: "100%"}} src={item.sprites.other.home.front_default}/>
            </div>
            <div className="right">
              <p style={{fontFamily: "Allerta Stencil", fontSize: "32px", textAlign: "center"}}>{item.name.toUpperCase()}</p>
              <div className="dataRow">
                <p>Height: </p>
                <p>{item.height}</p>
              </div>
              <div className="dataRow">
                <p>Weight: </p>
                <p>{item.weight}</p>
              </div>
              <div className="dataRow">
                <p>Type: </p>
                {item.types.map((type, key) => (
                  <p key={key}><Link to={`/type/${type.type.name}`}>{type.type.name}</Link></p>
                ))}
              </div>
              <div className="dataRow">
                <p>Abilities: </p>
                {item.abilities.map((ability,key) => (
                  <p key={key}>{ability.ability.name}</p>
                ))}
              </div>
              <div className="dataRow">
                <label>Moves: </label>
                <div className="pokemonMoves" style={{height: "150px"}}>
                  { item.moves.map((move, key) => <p key={key}>{move.move.name}</p>) }
                </div>
              </div>
              <div className="dataRow">
                <img src={item.sprites.back_default}/>
              </div>
            </div>
          </div>
        </div>
      )) : <Loader type="Puff" color="#ff6666" style={{textAlign: "center"}}/> }
    </div> 
  );
}

export default Pokemon;
