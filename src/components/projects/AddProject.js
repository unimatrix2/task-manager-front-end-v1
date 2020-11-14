import React, { Component } from 'react';
import axios from 'axios';
 
class AddProject extends Component {
  state = {
    title: "",
    description: "",
  }
   
  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      const { title, description } = this.state;
      // const title = this.state.title;
      // const description = this.state.description;
      console.log({ title, description })

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/projects/private/create`, { title, description });

      this.props.getData();
      this.setState({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  }
 
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }
 
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
 
export default AddProject;
