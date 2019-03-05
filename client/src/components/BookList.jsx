import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery} from '../graphql/queries';
import BookDetails from './BookDetails';


class BookList extends Component {
  state = {
    selected: null
  }

  handleClick = id => e => {
    e.preventDefault();
    this.setState({
      selected: id
    })
  }

  displayBooks = () => {
    const data = this.props.data;
    if (data.loading){
      return (
        <div>Loading books...</div>
      )
    } else {
      return(
        data.books.map(book => <li key={book.id} onClick={this.handleClick(book.id)}>{book.name}</li>)
      )
    }
  }

  render() {
    return (
      <div>
        <ul className="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
