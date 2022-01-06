import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

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


  return (
    <div className="All pokemons">
      <form style={{margin: "auto", width: "60%", textAlign: "center"}}>
        <h3>Pokemons</h3>
        {(pokemons.length > 0) ? pokemons.map((item, key) => (
          <div key={key}>
            <p>{item.name}</p>
          </div>
        )) : <p>Loading...</p> }
      </form>
    </div>
  );
}

export default App;
