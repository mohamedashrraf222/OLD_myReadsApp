import React from "react";

export default function wantToRead({ allBooks, changeShelf }) {

  // I am making the books are shown dynamically according to their data with map method

  let Books = allBooks.map((book) => {
    return (
      // at the first I check if the book is on this shelf or not and then return a div contain the book if it's
      book.shelf === "wantToRead" && (
        // each element in the book div take its structure from book data
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
                    changeShelf(book.title, e.target.value);
                  }}
                  defaultValue={book.shelf}
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
      )
    );
  });

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want to Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{Books}</ol>
      </div>
    </div>
  );
}
