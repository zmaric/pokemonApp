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
      // console.log(res.data)
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
          <button style={{margin: "20px 260px", color: "red", background: "white"}}>Back to homepage</button>
        </Link>
      </div>
      <div>
      {(pokemonData.length > 0) ? pokemonData.map((item, key) => (
        <div>
          <div key={key} className="pokemonDataDiv">
            <div className="left">
              <img style={{width: "100%"}} src={item.sprites.other.home.front_default}/>
            </div>
            <div className="right">
              <p style={{fontFamily: "Allerta Stencil", fontSize: "32px", textAlign: "center"}}>{item.name.toUpperCase()}</p>
              <div className="dataRow">
                <b>Height: </b>
                <p>{item.height}</p>
              </div>
              <div className="dataRow">
                <b>Weight: </b>
                <p>{item.weight}</p>
              </div>
              <div className="dataRow">
                <b>Type: </b>
                {item.types.map((type, key) => (
                  <p key={key}><Link to={`/type/${type.type.name}`}>{type.type.name}</Link></p>
                ))}
              </div>
              <div className="dataRow">
                <b>Abilities: </b>
                {item.abilities.map((ability,key) => (
                  <p key={key}>{ability.ability.name}</p>
                ))}
              </div>
              <div className="dataRow">
                <b>Moves: </b>
                <div className="pokemonMoves" style={{height: "150px"}}>
                  { item.moves.map((move, key) => <p key={key}>{move.move.name}</p>) }
                </div>
              </div>
            </div>
          </div>
        <div className="showMoreDiv">
          <button className="showMorebtn" onClick={() => document.getElementsByClassName("imgSliderDiv")[0].style.display = "block"}>Show more pictures</button>
        </div>
        <div className="imgSliderDiv">
          <button style={{color: "white", background: "red"}} onClick={() => document.getElementsByClassName("imgSliderDiv")[0].style.display = "none"}>X</button>
          {(images.length > 0) ? <ImageSlider
            width={425}
            height={400}
            bgColor={'white'}
            images={images}
            showBullets={true}
            autoPlay={true}
            style={{borderRadius: "25px", boxShadow: "2px 3px 23px rgba(0,0,0,.5)"}}
            /> : null }
          </div>
        </div>
      )) : <Loader type="Puff" color="#ff6666" style={{textAlign: "center"}}/> }
      </div>
    </div> 
  );
}

export default Pokemon;
