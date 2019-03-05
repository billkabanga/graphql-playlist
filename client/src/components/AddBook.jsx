import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, getBooksQuery } from '../graphql/queries';
import { addBookMutation } from '../graphql/mutations';


class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if(data.loading){
      return (
        <option disabled>Loading Authors...</option>
      )
    }else{
      return data.authors.map(author => {
        return (
          <option key={ author.id } value={ author.id }>{ author.name }</option>
        )
      })
    }
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" name="name" onChange={this.handleChange}/>
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" name="genre" onChange={this.handleChange}/>
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={this.handleChange} name="authorId">
                <option>Select author</option>
                { this.displayAuthors() }
            </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }) , 
  graphql(addBookMutation, { name: 'addBookMutation' }) 
  )(AddBook);
