import { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import ImageSlider from "react-simple-image-slider"
import './Pokemon.css'

function Pokemon() {

  const [pokemonData, setPokemonData] = useState([])
  const [images, setImages] = useState([])

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

  useEffect(() => {
    pokemonData.map(item => (
      setImages([
        {url: item.sprites.back_default},
        {url: item.sprites.front_default},
        {url: item.sprites.front_shiny},
        {url: item.sprites.other.home.front_default},
        {url: item.sprites.other.home.front_shiny},
        {url: item.sprites.other.dream_world.front_default},
      ])
    ))
  }, [pokemonData])
  
  console.log(images)

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
              <div style={{display: "flex"}}>
                <div className="dataPart">
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
                </div>
                <div className="imgPart">
                  <div>
                    {(images.length > 0) ? <ImageSlider
                      width={325}
                      height={300}
                      bgColor={'white'}
                      images={images}
                      showBullets={true}
                      autoPlay={true}
                      style={{borderRadius: "20%"}}
                    /> : null }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) : <Loader type="Puff" color="#ff6666" style={{textAlign: "center"}}/> }
    </div> 
  );
}

export default Pokemon;
