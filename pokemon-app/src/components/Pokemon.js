import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from  'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import ImageSlider from "react-simple-image-slider"
import { Store } from './util/Store'
import '../assets/styles/style.scss'

export default function Pokemon() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const { pokemon } = state

  const [pokemonData, setPokemonData] = useState([])
  const [images, setImages] = useState([])

  const showPhotos = () => {
    document.getElementsByClassName("imgSliderDiv")[0].style.display = "block"
  }

  const toggleMoves = () => {
    let el = document.querySelector('.dropdown-custom')
    if(el.getAttribute('hidden')) el.removeAttribute('hidden')
    else el.setAttribute('hidden', true)
  }

  const filterType = (type) => {
    dispatch({ type: 'TYPE_FILTER', payload: type })

    navigate('/')
  }

  useEffect(() => {
    const getData = async () => {
      let url = window.location.pathname
      let nameFromUrl = url.split('/')[2]
      let pokemonName = pokemon ? pokemon.name : nameFromUrl

      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      setPokemonData([res.data])
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
  

  return (
    <div className="pokemon-content">
      <div>
        <Link to="/">
          <button className="back-bt">Back</button>
        </Link>
      </div>
      <div>
      {(pokemonData.length > 0) ? pokemonData.map((item, key) => (
        <div key={key}>
          <div className="pokemon-data">
            <div className="left">
              <img src={item.sprites.other.home.front_default}/>
            </div>
            <div className="right">
              <p style={{fontFamily: "Allerta Stencil", fontSize: "32px", textAlign: "center"}}>{item.name.toUpperCase()}</p>
              <div className="data-line">
                <b>Height: </b>
                <p>{item.height}</p>
              </div>
              <div className="data-line">
                <b>Weight: </b>
                <p>{item.weight}</p>
              </div>
              <div className="data-line">
                <b>Type: </b>
                {item.types.map((type, key) => (
                  <p key={key} className="cp" onClick={() => filterType(type.type.name)}>{type.type.name}</p>
                ))}
              </div>
              <div className="data-line">
                <b>Abilities: </b>
                {item.abilities.map((ability,key) => (
                  <p key={key}>{ability.ability.name}</p>
                ))}
              </div>
              <div className="data-line mt-30">
                <span className="show" onClick={toggleMoves}>Show moves</span>
                <div className="dropdown-custom" hidden={true}>
                  {item.moves.map((move, key) => 
                    <div key={key}>{move.move.name}</div>) 
                  }
                </div>
              </div>
              <div className="data-line">
                <span className="show" onClick={showPhotos}>Show photos</span>
              </div>
            </div>
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
            style={{borderRadius: "16px", boxShadow: "2px rgba(0,0,0,.3)"}}
            /> : null }
          </div>
        </div>
      )) : <Loader type="Puff" color="#ff6666" style={{textAlign: "center"}}/> }
      </div>
    </div> 
  );
}

