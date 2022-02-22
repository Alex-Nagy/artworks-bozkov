import React from 'react'
import { MdImageSearch } from "react-icons/md";
import { FiDelete } from "react-icons/fi";

const Search = ({searchString, setSearchString, search}) => {
  return (
    <div>
      <form className="searchForm" onSubmit={(e) => {
          e.preventDefault();
          search()
        }}>
        <input type="text" name="search" className="searchInput" placeholder="search" value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
        { searchString.length > 0 ? <button className="clearButton" onClick={() => setSearchString("")} title="clear search"><FiDelete /></button> : ""}
        <button className="searchButton"><MdImageSearch /></button>
        </form>
    </div>
  )
}

export default Search