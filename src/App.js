import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import AddBooks from './AddBooks';
import BooksShelf from './BooksShelf'

class BooksApp extends React.Component {

  /* ------ Comments ------ //
   + Search Component => onSubmit
   + moveBook => API.update 

  // ------ Comments ------ */
  render() {
    return (
      <div className="app">
      <Route exact path="/add" render={()=>(<AddBooks />)} />
      <Route exact path="/" render={()=> (<BooksShelf />)} />
      </div>
    );
  }
}

export default BooksApp
