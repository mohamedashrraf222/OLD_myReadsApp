import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Router,
  json,
} from "react-router-dom";
import { useState, useEffect } from "react";
//
// I have made diffrent components for every shelf to be more redable and not to be complicated
import MainShelf from "./components/shelf";
//
// impoting the array that I have put all books data in
import AllBoks from "./assets/AllBooks";
//
// importin our API
import * as BooksAPI from "./assets/BooksAPI";
import SearchPage from "./components/searchPage";

// ---------------------------- //

function App() {
  // for mainPage
  // at the first I am defining functions and states that I wil use
  const [allBooks, setAllBooks] = useState(AllBoks);

  // for mainPage
  // this is the function that's resposople to change shelf of any book by the idex of it in the data array and the shelf name
  function changeData(index, newShelf) {
    let updatedData = allBooks;
    updatedData[index].shelf = newShelf;
    setAllBooks([...updatedData]);
  }

  // for mainPage
  // this function is responsible for getting the book's index by its name and then revoke changeData function to change the shelf of the book
  function findBook(name, newShelf) {
    for (let i = 0; i < allBooks.length; i++) {
      allBooks[i].title === name ? changeData(i, newShelf) : false;
    }
  }

  // for searchPage
  // here I am defining books of the search page and getting them from the server with useEffect
  const [apiBooks, setApiBooks] = React.useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((res) => setApiBooks(res));
    console.log(`useEffect happend`);
  }, []);

  

  // for mainPage && searchPage
  // this function is passed to the search page to add the data of book with books on main page
  function addDataToMainPage(bookData) {
    setAllBooks((prev) => {
      return [...prev, bookData];
    });
  }

  //
  // putting the main page in a component
  let Mainpage = () => {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* giving every component the function and the data needed */}
            <MainShelf
              allBooks={allBooks}
              changeShelf={findBook}
              shelfName="currentlyReading"
            />
            <MainShelf
              allBooks={allBooks}
              changeShelf={findBook}
              shelfName="wantToRead"
            />
            <MainShelf
              allBooks={allBooks}
              changeShelf={findBook}
              shelfName="read"
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="search">Add a book</Link>
        </div>
      </div>
    );
  };

  //
  //making the page with routes for search and for mainpage
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Mainpage />} />
        <Route
          path="search"
          element={
            <SearchPage
              addDataToMainPage={addDataToMainPage}
              setApiBooks={setApiBooks}
              apiBooks={apiBooks}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
