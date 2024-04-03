import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Pagination from './Pagination';
import Loader from 'react-loader-spinner'
import axios from 'axios';
import { Store } from '../util/Store';
import image from '../../ball.png'
import '../../assets/styles/style.scss';


function Table({filteredData}) {
  const navigate = useNavigate()
  const { dispatch } = useContext(Store)

  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage] = useState(20)
  const [tData, setTData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [searchData, setSearchData] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)
     
  const fetchData = async () => {
    try {
      if(searchData) return

      let selectedPage = document.querySelector('.active')
      if(selectedPage){
        selectedPage = selectedPage.querySelector('.page-link').innerText
        selectedPage = parseInt(selectedPage)
      } else {
        selectedPage = 1
      }
      let indexCurrPage = selectedPage - 1
      let setOffset = indexCurrPage * 20
      const res = !filteredData.length ? await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${setOffset}&limit=20`) : ''
      
      let count = filteredData.length ? filteredData.length : res?.data.count
      let splicedData = currentPage * 20
      let splicedIndex = splicedData-20
      let data = filteredData.length ? filteredData.slice(splicedIndex, splicedData) : res.data?.results
      if(data.length){
        data.forEach(item => {
          if(!item.name) item.name = item.pokemon.name
          return item
        })
      }

      setTData(data)
      setTotalCount(count)
      setIsLoading(false)
    } catch(err){
      console.error(err)
    }
  }


  const initTable = (data) => {
    if(!data || !data.length) return
    
    return data.map((el, key) => (
      <ul key={key} onClick={() => setPokemon(el)}>
        <li><img src={image}/><p><span>{el.name}</span></p></li>
      </ul>      
    ))
  }

  const setPokemon = (data) => {
    dispatch({ type: 'POKEMON', payload: data })
    navigate(`/pokemon/${data.name}`)
  }

  const searchTData = (srch) => {
    setSearchData(srch)
    let data = filteredData.length ? filteredData : tData
    data = data.filter(item => {
      let name = item.name || item.pokemon.name
      return name.includes(srch)
    })
    if(data.length > 20) data = data.slice(0,20)

    setTData(data)
    setTotalCount(data.length)
  }

  useEffect(() => {
    fetchData(searchData ? searchData.toLowerCase() : '')
  }, [currentPage, searchData, filteredData])

  
  return isLoading ? (
    <Loader type="Puff" color="#ff6666" style={{textAlign: "center"}}/>
    ) : (
    <div className="table-content">
      <div className="search-table">
        <input className="srch-inp" type="text" placeholder="Search.." onChange={(event => {searchTData(event.target.value)})} />
      </div>
      <div className="table-body">
          {initTable(tData)}
      </div>
      <Pagination
        dataPerPage={dataPerPage}
        totalData={totalCount}
        paginate={paginate}
      /> 
      </div>
  );
}

export default Table
