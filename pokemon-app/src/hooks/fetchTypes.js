import axios from 'axios'

async function fetchTypes(types) {
  let res = []
  for(let type of types){
    let res_data = await axios.get(`https://pokeapi.co/api/v2/type/${type.name}`)
    res_data.data.pokemon.map(item => (
      res.push(item.pokemon)
    ))
  }

  return res  
}

export default fetchTypes
