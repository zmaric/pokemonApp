import { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './AllPokemons.css'

function AllPokemons() {

  const [pokemons, setPokemons] = useState([])

  // used useEffect to fetch data only first time after page loads
  // inside is created function that fetch data with axios and set data to pokemons array
  useEffect(() => {
      const getData = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
      setPokemons(res.data.results)
      // console.log(res.data.count)
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


  return (
    <div className="AllPokemons">
      <form className="allPokemons_body" style={{margin: "auto", width: "50%", textAlign: "center"}}>
        <h3 style={{fontFamily: "sans-serif", fontSize: "28px"}}>Pokemons</h3>
        <div className="search_pokemon_div">
          <input type="text" id="search_pokemon" placeholder="Search.." onChange={(event => {setSearchData(event.target.value)})} />
        </div>
        {(pokemons.length > 0 && !searchData) ? currentData.map((item, key) => (
          <div key={key}>
            <p style={{fontFamily: "sans-serif", fontSize: "18px"}}><Link to={`/pokemon/${item.name}`}>{item.name}</Link></p>
          </div>
        )) : (pokemons.length > 0 && searchData) ? currentDataSearch.map((item, key) => (
          <div key={key}>
            <p style={{fontFamily: "sans-serif", fontSize: "18px"}}><Link to={`/pokemon/${item.name}`}>{item.name}</Link></p>
          </div>
        )) : <Loader type="Puff" color="#ff6666" style={{textAlign: "center"}}/> }
      </form>
      <div style={{display: "flex", width: "10%", margin: "auto", justifyContent: "center"}}>
        {(!searchData) ? pageNumber.map((item, key) => (
          <li key={key} style={{listStyle: "none", width: "25px", padding: "0 2px" }} onClick={() => setPages(item)}>{item}</li>
        )) : pageNumberSearch.map((item, key) => (
          <li key={key} style={{listStyle: "none", width: "25px", padding: "0 2px" }} onClick={() => setPages(item)}>{item}</li>
        ))}
      </div>
    </div> 
    
  );
}

export default AllPokemons;
