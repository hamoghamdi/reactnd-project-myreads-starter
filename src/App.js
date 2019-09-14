import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import AddBooks from './AddBooks';
import BooksShelf from './BooksShelf'

class BooksApp extends React.Component {
  state = {
    books: []
  };
  moveBook = event => {
    console.log("move book", event.target.value);
  };
  /* ------ Comments ------ //
   + BooksShelf => .filter .mapX3
   + Search Component => onSubmit
   + moveBook => API.update 
// => COMPONENTS: App, BooksShelf( CurrentlyReading, WantoRead, Read)

  // ------ Comments ------ */

  componentDidMount(){

    console.log("this is component did mount")
    BooksAPI.getAll()
      .then(res => {
        console.log("res", res)
        this.setState(()=> {
          return { books: res }
        })
      }
        )
      .catch(error => console.log("error", error))
  }
  render() {
    return (
      <div className="app">
      <Route exact path="/add" render={()=>(<AddBooks />)} />
      <Route exact path="/" render={()=> (<BooksShelf books={this.state.books}/>)} />
      </div>
    );
  }
}

export default BooksApp
