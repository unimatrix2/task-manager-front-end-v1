import React, { Component } from 'react';
import axios from 'axios';
 
class AddTask extends Component {
  state = {
    title: "",
    description: "",
    isShowing: false, // `isShowing` will help us to toggle add task form
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();

    const{ title, description } = this.state;
    const project = this.props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing project 
                                                // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
    
    // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/tasks/private/create`, { title, description, project })
    .then( () => {
          // after submitting the form, retrieve project one more time so the new task is displayed as well 
          //              |
        this.props.getTheProject();
        this.setState({title: "", description: "", isShowing: false});
    })
    .catch( error => console.log(error) )
  }
 
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
 
  toggleForm = () => {
    this.setState({ isShowing: !this.state.isShowing });
  }
 
  showAddTaskForm = () => {
    return this.state.isShowing && (
      <div>
        <h3>Add Task</h3>
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
 
  render(){
    return(
      <div>
            <hr />
            <button onClick={() => this.toggleForm()}> Add task </button>
            {this.showAddTaskForm()}
      </div>
    )
  }
}
 
export default AddTask;
