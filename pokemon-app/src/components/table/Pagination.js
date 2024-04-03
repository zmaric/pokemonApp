import React, { useState } from 'react';
import '../../assets/styles/style.scss';

const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumbers = []
  const [currentPage, setCurrentPage] = useState(1)
  const [pageNumState] = useState(Math.ceil(totalData / dataPerPage))

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i)
  }

  function setActive(evt) {
    let pages = document.querySelectorAll('.page-item')
    for(let page of pages){
      page.classList.remove('active')
    }

    if (evt.target.innerText === 'Next') {
      if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1)
    }

    if (evt.target.innerText === 'Prev') {
      if (currentPage > 1) setCurrentPage(currentPage - 1)
    }
    if (evt.target.innerHTML !== 'Prev' && evt.target.innerHTML !== 'Next') {
      let el = evt.target.parentNode.className.includes('page-item') ? evt.target.parentNode : evt.target
      setCurrentPage(parseInt(el.innerText))
      el.classList.add('active')
    }
  }

  const renderPageNumbers = () => {
    const visiblePages = pageNumbers.length > 9 ? 10 : pageNumbers.length
    const halfVisiblePages = Math.floor(visiblePages / 2)
    let startPage, endPage

    if (currentPage <= halfVisiblePages) {
      startPage = 1
      endPage = visiblePages
    } else if (currentPage + halfVisiblePages >= pageNumbers.length) {
      startPage = pageNumbers.length - visiblePages + 1
      endPage = pageNumbers.length
    } else {
      startPage = currentPage - halfVisiblePages
      endPage = currentPage + halfVisiblePages
    }

    const pageItems = []

    if (startPage > 1) {
      pageItems.push(
        <li key="ellipsisPrev" className="wo-hover">
          <span>...</span>
        </li>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <li key={i} className={i === currentPage ? 'page-item active' : 'page-item'} onClick={(evt => {paginate(i); setCurrentPage(i); setActive(evt)})}>
          <span className='page-link'>{i}</span>
        </li>
      )
    }

    if (endPage < pageNumbers.length) {
      pageItems.push(
        <li key="ellipsisNext" className="wo-hover">
          <span>...</span>
        </li>
      )
    }

    return pageItems
  }

  return (
    <nav>
      <ul className='pagination'>
        <li>
          {(currentPage !== 1 && pageNumState > 1) ? 
            (<span onClick={(evt) => {paginate(currentPage-1); setCurrentPage(currentPage-1); setActive(evt)}}>{'Prev'}</span>) : '' 
          }
        </li>
        {renderPageNumbers()}
        <li>
          {(currentPage !== pageNumbers.length && pageNumState > 1) ? 
            (<span onClick={(evt) => {paginate(currentPage+1); setCurrentPage(currentPage+1); setActive(evt)}}>{'Next'}</span>) : ''
          }
        </li>
      </ul>
    </nav>
  )
}


export default Pagination
