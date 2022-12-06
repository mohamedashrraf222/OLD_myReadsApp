import React from "react";
import { Link } from "react-router-dom";
import SearchBooks from "./searchBooks";
import SearchBox from "./searchBox";

export default function SearchPage({
  addDataToMainPage,
  apiBooks,
}) {

  // 
  // this state is for the books which are shown on the search page
  const [shownBooks, setShownBooks] = React.useState([]);

  // for searchBox
  // this function is to filter the books shown on the searchPage with search value
  function filterBooks(search) {
    //
    // search is the value of ipute in the box
    console.log(search);
    //
    // this is the new version working function with bug in search
    let updatedData = apiBooks.filter((book) => {
      return book.title.toLowerCase().includes(search.toLowerCase());
    });
    //
    // this fuction is to set the shown books in the search page
    setShownBooks(updatedData);
    console.log(updatedData);
  }

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* here I am passing setApiBooks function to the search box component */}
            <SearchBox filterBooks={filterBooks} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              <SearchBooks
                shownBooks={shownBooks}
                setShownBooks={setShownBooks}
                addDataToMainPage={addDataToMainPage}
              />
            }
          </ol>
        </div>
      </div>
    </div>
  );
}
