import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Book from './Book'


class BooksShelf extends Component {
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
                  {this.props.books.filter(b => b.shelf === 'currentlyReading').map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      onMoveBook={(e, book) => this.props.onMoveBook(e, book)}
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
                  {this.props.books.filter(b => b.shelf === 'wantToRead').map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      onMoveBook={(e, book) => this.props.onMoveBook(e, book)}
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
                  {this.props.books.filter(b => b.shelf === 'read').map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      onMoveBook={(e, book) => this.props.onMoveBook(e, book)}
                    />
                  ))}
                  {/* ///////////////////////////////// */}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <Link to="/search">
          <div className="open-search">
            <button>Add a book</button>
          </div>
        </Link>
      </div>
    );
  }
}

export default BooksShelf;