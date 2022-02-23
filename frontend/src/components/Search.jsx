import React from 'react'
import { MdImageSearch } from "react-icons/md";
import { FiDelete } from "react-icons/fi";

const Search = ({searchString, setSearchString, search, clearSearch}) => {

  return (
    <div>
      <form className="searchForm" onSubmit={(e) => {
          e.preventDefault();
          search()
        }}>
        <input type="text" name="search" className="searchInput" placeholder="search (title, artist, description, classification, culture)" value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
        <button className="searchButton"><MdImageSearch /></button>
        <button className={ searchString.length > 0 ? "clearButton" : "clearButton hidden" } onClick={(e) => clearSearch(e)} title="clear search"><FiDelete /></button>
        </form>
    </div>
  )
}

export default Search