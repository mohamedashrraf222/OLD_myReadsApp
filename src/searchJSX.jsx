import React from "react";

export default function SearchBooks({
  apiBooks,
  setApiBooks,
  addDataToMainPage,
}) {
  //
  // this function is used to add the selected book to our data in the main page with its shelf
  function handleDataChange(index, shelf) {
    //
    // at the first I am removing the book from the search page because it's supposed to be in our main page
    setApiBooks((prev) => {
      prev.splice(index, 1);
      // console.log(prev);
      return prev;
    });

    //
    // this function is used to add the book to the data on the main page
    function processData() {
      let bookWillSent = apiBooks[index];
      bookWillSent.shelf = shelf;
      addDataToMainPage(bookWillSent);
      console.log(bookWillSent);
    }
    processData();
  }

  //
  // this function is to find the book index which is clicked in the search page
  function findBookInAPI(name, shelf) {
    for (let i = 0; i < apiBooks.length; i++) {
      apiBooks[i].title === name ? handleDataChange(i, shelf) : false;
    }
  }

  function SearchBooks() {
    return apiBooks.map((book) => {
      return (
        <li key={book.title}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 188,
                  backgroundImage: `url(${book.imageLinks.thumbnail})`,
                }}
              ></div>
              <div className="book-shelf-changer">
                {/* I am using change shelf function with onChange event to change the data of the books */}
                <select
                  onChange={(e) => {
                    findBookInAPI(book.title, e.target.value);
                  }}
                  defaultValue="none"
                >
                  <option value="none" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors[0]}</div>
          </div>
        </li>
      );
    });
  }

  function Alert(params) {
    return <div>please refresh the page</div>;
  }

  return Array.isArray(apiBooks) ? <SearchBooks /> : <Alert />;
}
