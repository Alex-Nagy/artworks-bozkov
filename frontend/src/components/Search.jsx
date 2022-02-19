import React from 'react'
import { MdImageSearch } from "react-icons/md";

const Search = ({searchString, setSearchString, search}) => {
  return (
    <div>
      <form onSubmit={(e) => {
          e.preventDefault();
          search()
        }}>
        <input type="text" name="search" className="searchInput" placeholder="search" value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
        <button className="searchButton"><MdImageSearch /></button>
        </form>
    </div>
  )
}

export default Search