import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
 
class TaskDetails extends Component {
  state = {}
 
  componentDidMount(){
    this.getTheTask();
  }
 
  getTheTask = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks/private/list/${params.taskId}`)
    .then( responseFromApi =>{
      const theTask = responseFromApi.data;
      this.setState(theTask);
    })
    .catch((err)=>{
        console.log(err)
    })
  }
 
  render(){
    console.log(this.state)
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        {this.state.title && (
          <Link to={`/projects/${this.state.project._id}`}>
            Back to {this.state.project.title} details
          </Link>
        )}
      </div>
    )
  }
}
 
export default TaskDetails;
