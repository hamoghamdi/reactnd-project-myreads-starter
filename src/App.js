import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import AddBooks from './AddBooks';
import BooksShelf from './BooksShelf'
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  updateBooks = () => {
    BooksAPI.getAll()
      .then(res => {
        console.log("res", res);
        this.setState(() => {
          return { books: res };
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
        this.setState(() => {
          return { books: res };
        });
      })
      .catch(error => console.log("error", error));
  }
  /* ------ Comments ------ //
  
  // ------ Comments ------ */
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <AddBooks
              onMoveBook={(e, b) => this.moveBook(e, b)}
              books={this.state.books}
            />
          )}
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
