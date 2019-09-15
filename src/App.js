import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import AddBooks from './AddBooks';
import BooksShelf from './BooksShelf'
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: { currentlyReading: [], read: [], wantToRead: [] }
  };

  updateBooks = () => {
    // it returns an obj, containing three atr, each is a list of id's
    // this.state.map
    BooksAPI.getAll()
      .then(res => {
        console.log("res", res);
        const currentlyReading = res.filter(
          b => b.shelf === "currentlyReading"
        );
        const read = res.filter(b => b.shelf === "read");
        const wantToRead = res.filter(b => b.shelf === "wantToRead");
        this.setState(() => {
          return { books: { currentlyReading, read, wantToRead } };
        });
      })
      .catch(error => console.log("error", error));
  };

  moveBook = (event, book) => {
    const shelf = event.target.value;
    BooksAPI.update(book, shelf).then(res => {
      console.log("res from update", res);
      this.updateBooks();
    });
    console.log("move book", shelf);
    console.log("is this book obj ?", book);
  };

  componentDidMount() {
    console.log("this is component did mount");
    BooksAPI.getAll()
      .then(res => {
        console.log("res", res);
        const currentlyReading = res.filter(
          b => b.shelf === "currentlyReading"
        );
        const read = res.filter(b => b.shelf === "read");
        const wantToRead = res.filter(b => b.shelf === "wantToRead");
        this.setState(() => {
          return { books: { currentlyReading, read, wantToRead } };
        });
      })
      .catch(error => console.log("error", error));
  }
  /* ------ Comments ------ //
  
  + Search is mirroring the input, not waiting onSubmit
  + when no search input, no search result 
  + Option matches shelf in search page

  // ------ Comments ------ */
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => <AddBooks onMoveBook={(e, b) => this.moveBook(e, b)} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <BooksShelf
              books={this.state.books}
              onMoveBook={(e, b) => this.moveBook(e, b)}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp
