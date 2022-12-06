import React from "react";

// in this searchBar component I am makking the search box controlled

export default function SearchBox({ setApiBooks , filterBooks }) {


  const [search, setSearch] = React.useState("");
  
  // this function is used for searching and filtering books data in apiBooks variable
  function handleSearchChange(e) {
    setApiBooks(prev => prev)
    setSearch(e.target.value);
    filterBooks(e.target.value);
  }

  

  return (
    <input
      type="text"
      placeholder="Search by title, author, or ISBN"
      value={search}
      onChange={handleSearchChange}
    />
  );
}
