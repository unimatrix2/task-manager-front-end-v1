import React, { Component } from 'react';
import axios from 'axios';
 
class EditProject extends Component {
  state = {
    title: this.props.theProject.title, 
    description: this.props.theProject.description,
    id: this.props.theProject._id,
  }
  
  handleFormSubmit = (event) => {
    const { title, description } = this.state;
    // const title = this.state.title;
    // const description = this.state.description;
    console.log(this.props);
    event.preventDefault();
 
    axios.put(`${process.env.REACT_APP_API_BASE_URL}/projects/private/update/${this.state.id}`, { title, description })
    .then( () => {
        // after submitting the form, redirect to '/projects'
        this.props.history.push('/projects');
    })
    .catch( error => console.log(error) )
  }
 
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
 
  render(){
    console.log('RENDERIZADO EDIT PROJECT')
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
 
export default EditProject;
