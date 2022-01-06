import { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'

function AllPokemons() {

  const [pokemons, setPokemons] = useState([])

  // used useEffect to fetch data only first time after page loads
  // inside is created function that fetch data with axios and set data to pokemons array
  useEffect(() => {
      const getData = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200')
      setPokemons(res.data.results)
      }
      getData()
  }, [])

  // Pagination
  // created variables for number of pages, how many data are per page and array of page numbers
  const [pages, setPages] = useState(1)
  const dataPerPage = 20
  const pageNumber = []

  // get last and first data per page and display sliced data at once
  const indexOfLastData = dataPerPage * pages
  const indexOfFirstData = indexOfLastData - dataPerPage
  const currentData = pokemons.slice(indexOfFirstData, indexOfLastData)
  // console.log(currentData)

  // throught loop push page number into array
  for(let i = 1; i <= Math.ceil(pokemons.length / dataPerPage); i++){
    pageNumber.push(i)
  }

  return (
    <div className="AllPokemons">
      <form style={{margin: "auto", width: "60%", textAlign: "center"}}>
        <h3>Pokemons</h3>
        {(pokemons.length > 0) ? currentData.map((item, key) => (
          <div key={key}>
            <p><Link to={`/pokemon/${item.name}`}>{item.name}</Link></p>
          </div>
        )) : <p>Loading...</p> }
      </form>
      <div style={{display: "flex", width: "10%", margin: "auto", justifyContent: "center"}}>
        {pageNumber.map((item, key) => (
          <li key={key} style={{listStyle: "none", width: "25px", padding: "0 2px" }} onClick={() => setPages(item)}>{item}</li>
        ))}
      </div>
    </div> 
    
  );
}

export default AllPokemons;
