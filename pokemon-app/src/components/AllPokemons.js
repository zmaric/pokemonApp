import { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './AllPokemons.css'
import image from '../ball.png'

function AllPokemons() {

  const [pokemons, setPokemons] = useState([])

  // used useEffect to fetch data only first time after page loads
  // inside is created function that fetch data with axios and set data to pokemons array
  useEffect(() => {
      const getData = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
      setPokemons(res.data.results)
      console.log(res.data)
      }
      getData()
  }, [])

  // Pagination
  // created variables for number of pages, how many data are per page and array of page numbers
  let [pages, setPages] = useState(1)
  let dataPerPage = 20
  let pageNumber = []
  let [pageNumberSearch, setPageNumberSearch] = useState([])

  // get last and first data per page and display sliced data at once
  let indexOfLastData = dataPerPage * pages
  let indexOfFirstData = indexOfLastData - dataPerPage
  let currentData = pokemons.slice(indexOfFirstData, indexOfLastData)
  // console.log(currentData)

  // throught loop push page number into array
  for(let i = 1; i <= Math.ceil(pokemons.length / dataPerPage); i++){
    pageNumber.push(i)
  }

  // Set searchbar
  const [searchData, setSearchData] = useState('')
  const [searchedPokemons, setSearchedPokemons] = useState([])
  let currentDataSearch = searchedPokemons.slice(indexOfFirstData, indexOfLastData)

  // Set pokemons after search. useEffect is in use because pokemons will be set only after searchBar input is changed.
  useEffect(() => {
    let search_array = []
    pokemons.filter((val) => {
      if(val.name.toLowerCase().includes(searchData.toLowerCase())){
        search_array.push(val)
      } 
    })
    setSearchedPokemons(search_array)
  }, [searchData])

  // Set page numbers for paginations after search
  useEffect(() => {
    let search_pagenumber = []
    
    for(let i = 1; i <= Math.ceil(searchedPokemons.length / dataPerPage); i++){
      search_pagenumber.push(i)
    }
    setPageNumberSearch(search_pagenumber)
  }, [searchedPokemons])

  // Pokemon ball icon was used by author smashicons from flaticon.com
  // <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>


  const [showAll, setShowAll] = useState(false)

  const setShowAllPokemons = (event) => {
    event.preventDefault()
    setShowAll(true)
  }

  const unsetShowAllPokemons = (event) => {
    event.preventDefault()
    setShowAll(false)
  }

  console.log(pokemons.length)
  return (
    <div className="AllPokemons">
      <head>
        <link href="http://fonts.cdnfonts.com/css/pokemon-solid" rel="stylesheet"/>
        <link href='https://fonts.googleapis.com/css?family=Allerta Stencil' rel='stylesheet'/>
      </head>
      <h3>Pokemons</h3>
      <div className="searchShowDiv">
        {(!showAll) ? <button onClick={setShowAllPokemons}>SHOW ALL</button> : <button onClick={unsetShowAllPokemons}>SHOW IN TABLE</button>}
        <input type="text" id="search_pokemon" placeholder="Search.." onChange={(event => {setSearchData(event.target.value)})} />
      </div>
      <form className="allPokemons_body" style={{margin: "auto"}}>
        <div>
          <ul>
          {(pokemons.length > 0 && !searchData && !showAll) ? currentData.map((item, key) => (
            <li key={key}><img src={image}/><p style={{ transform: "translate(0, -200%)"}}><Link style={{color: "#1a75ff", textDecoration: "none", WebkitTextStroke: "1px white"}} to={`/pokemon/${item.name}`}>{item.name}</Link></p></li>
          )) : (pokemons.length > 0 && searchData && !showAll) ? currentDataSearch.map((item, key) => (
            <li key={key}><img src={image}/><p style={{ transform: "translate(0, -200%)"}}><Link style={{color: "#1a75ff", textDecoration: "none", WebkitTextStroke: "1px white"}} to={`/pokemon/${item.name}`}>{item.name}</Link></p></li>
          )) : (showAll) ? pokemons.map((item, key) => (
            <li key={key}><img src={image}/><p style={{ transform: "translate(0, -200%)"}}><Link style={{color: "#1a75ff", textDecoration: "none", WebkitTextStroke: "1px white"}} to={`/pokemon/${item.name}`}>{item.name}</Link></p></li>
          )) : <Loader type="Puff" color="#ff6666" style={{textAlign: "center"}}/> }
          </ul>
        </div>
      </form>
      <div className="paginationDiv" style={{display: "flex", flexWrap: "wrap", margin: "auto", justifyContent: "center"}}>
        {(!searchData && !showAll) ? pageNumber.map((item, key) => (
          <li key={key} style={{listStyle: "none", width: "25px", padding: "0 2px" }} onClick={() => setPages(item)}>{item}</li>
        )) : (searchData && !showAll) ? pageNumberSearch.map((item, key) => (
          <li key={key} style={{listStyle: "none", width: "25px", padding: "0 2px" }} onClick={() => setPages(item)}>{item}</li>
        )) : null}
      </div>
    </div> 
    
  );
}

export default AllPokemons;
