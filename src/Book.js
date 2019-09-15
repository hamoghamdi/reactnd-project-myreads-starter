import React, { Component } from 'react';

class Book extends Component {
  handleChange = (e, book) =>{
      this.props.onMoveBook(e, book);    
    console.log('book component', book)
  }
  render() {
   
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
              }}
            ></div>
            <div className="book-shelf-changer">
              <select onChange={e => this.handleChange(e, this.props.book)} defaultValue={this.props.shelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option
                  value="currentlyReading"
                  selected={this.props.book.shelf === "currentlyReading"}
                >
                  Currently Reading
                </option>
                <option
                  value="wantToRead"
                  selected={this.props.book.shelf === "wantToRead"}
                >
                  Want to Read
                </option>
                <option
                  value="read"
                  selected={this.props.book.shelf === "read"}
                >
                  Read
                </option>
                <option
                  value="none"
                  selected={this.props.book.shelf ? false : true}
                >
                  None
                </option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.hasOwnProperty("authors")
              ? this.props.book.authors.map((a, index) => (
                  <p key={index}>{a}</p>
                ))
              : ""}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;

// onChange={e => this.moveBook(e)}