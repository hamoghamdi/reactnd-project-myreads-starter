import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from "./BooksAPI";


class BooksShelf extends Component {
  state = {
    books: { currentlyReading: [], read: [], wantToRead:[] }
  };
  updateBooks = () =>{
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
  }
  moveBook = (event, book) => {
    const shelf = event.target.value;
    BooksAPI.update(book, shelf).then((res) => {
        console.log('res from update',res)
        this.updateBooks()
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

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {/* ///////////////////////////////// */}
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {/* ///////////////////////////////// */}
                  {this.state.books.currentlyReading.map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      onMoveBook={(e, book) => this.moveBook(e, book)}
                    />
                  ))}
                  {/* ///////////////////////////////// */}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {/* ///////////////////////////////// */}
                  {this.state.books.wantToRead.map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      onMoveBook={(e, book) => this.moveBook(e, book)}
                    />
                  ))}
                  {/* ///////////////////////////////// */}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {/* ///////////////////////////////// */}
                  {this.state.books.read.map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      onMoveBook={(e, book) => this.moveBook(e, book)}
                    />
                  ))}
                  {/* ///////////////////////////////// */}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <Link to="/add">
          <div className="open-search">
            <button>Add a book</button>
          </div>
        </Link>
      </div>
    );
  }
}

export default BooksShelf;