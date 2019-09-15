import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as BooksAPI from "./BooksAPI";
import Book from './Book'

class AddBooks extends Component {
    state ={
        searchInput: '',
        searchResult:[]
    }
    handleChange =(e) =>{
      const query = e.target.value
      console.log('query', query)
        this.setState(() => {
            return { searchInput: query };
        })
    }
    handleSubmit = (e) =>{
      e.preventDefault()
      console.log('this is submit')
      BooksAPI.search(this.state.searchInput).then(res => {
        console.log("search res", res);
        this.setState(()=> {
          return {searchResult: res}
        })
      });
    }
    render() {
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
                <button className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                <form onSubmit={e => this.handleSubmit(e)}>
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value={this.state.searchInput}
                    onChange={e => this.handleChange(e)}
                  />
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchResult.map(book => (
                  <Book
                    key={book.id}
                    book={book}
                    onMoveBook={(e, book) => this.props.onMoveBook(e, book)}
                  />
                ))}
              </ol>
            </div>
          </div>
        );
    }
}

export default AddBooks;