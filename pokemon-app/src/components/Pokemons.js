import { useState, useEffect, useContext } from 'react'
import Table from './table/Table'
import axios from 'axios'
import '../assets/styles/style.scss'
import { Store } from './util/Store'

function Pokemons() {

  const [filterTypes, setFilterTypes] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filterCheckboxes, setFilterCheckboxes] = useState([])

  const { state } = useContext(Store)
  const { types } = state
    
  const setCheckboxFilteredPokemons = async () => {
    let checkedEls = document.querySelectorAll('input:checked')
    if(checkedEls.length){
      checkedEls = Array.from(checkedEls).map(item => item.id)

      for(let c of checkedEls){
        let res = await axios.get('https://pokeapi.co/api/v2/type/'+c)
        setFilteredData(filteredData.concat(res.data?.pokemon))
      }
    } 
  }

  function sortTypes(data){
    return data.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
  }

  async function fetchTypePokemons(type) {
    setFilterCheckboxes(prevState => ([...prevState, type]))

    let res = await axios.get('https://pokeapi.co/api/v2/type/'+type)
    console.warn(type)
    setFilteredData(res.data?.pokemon)
  }
  
  useEffect(() => {
    async function fetchTypes() {
      let res = await axios.get('https://pokeapi.co/api/v2/type')
      if(res.data?.results) res.data.results = sortTypes(res.data.results)
      setFilterTypes(res.data.results || [])
    }
    fetchTypes()  
  }, [])

  useEffect(() => {    
    if(types){
      let checkboxes = filterTypes
      checkboxes.forEach(item => {
        if(item.name == types) item.checked = true
        return item
      })

      setFilterTypes(checkboxes)
      fetchTypePokemons(types)
      console.warn(filterCheckboxes)
    }
  
  }, [filterTypes])



  return (
    <div style={{display: "flex"}}>
      <div className="filter-types">
        <div className="filter-box">
            {(filterTypes.length > 0) ? filterTypes.map((item, key) => (
              <div key={key} className="type-item">
                <input type="checkbox" id={item.name} value={item.name} checked={item.checked} /><label key={key}>{item.name}</label>
              </div>
            )) : null}
          
          <button onClick={() => setCheckboxFilteredPokemons()}>Filter</button>
        </div>
      </div>
      <div className="pokemons-content">
        <h3>Pokemons</h3>        
        <Table filteredData={filteredData} />
      </div> 
    </div>
    
  );
}

export default Pokemons;
