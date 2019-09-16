import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as BooksAPI from "./BooksAPI";
import Book from './Book'

class AddBooks extends Component {
  state = {
    searchInput: "",
    searchResult: [],
    result: true
  };
  search = query => {
    console.log("this is search");
    BooksAPI.search(query.trim()).then(res => {
      console.log("search res", res);
      if(res.error === "empty query"){
        console.log('do something')
        this.setState(() =>{
          return {result: false}
        })
      } else {
        let updatedSearch = res;
        this.props.books.forEach(bshelf => {
          updatedSearch.forEach(b => {
            if (b.id === bshelf.id) b.shelf = bshelf.shelf;
          });
        });
        console.log('updated search', updatedSearch)
      this.setState(() => {
        return { searchResult: updatedSearch, result:true };
      });
    }
    })
  };
  handleChange = e => {
    const query = e.target.value;
    console.log("query", query);
    this.setState(() => {
      return { searchInput: query };
    });
    if (query !== "") {
      e.preventDefault();
      this.search(query);
    } else {
      this.setState(() => {
        return {searchResult: [] }
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.searchInput;
    console.log("query", query);
    this.search(query);
  };
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
            {this.state.result ? this.state.searchResult.map(book => (
              <Book
                key={book.id}
                book={book}
                onMoveBook={(e, book) => this.props.onMoveBook(e, book)}
              />
            )) : (<p>No results found</p>)}
          </ol>
        </div>
      </div>
    );
  }
}

export default AddBooks;