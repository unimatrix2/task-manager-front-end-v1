import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import apiServices from '../../services/api.service';
class TaskDetails extends Component {
  state = {}
 
  componentDidMount(){
    this.getTheTask();
  }
 
  getTheTask = async () => {
    try {
      const { params } = this.props.match;

      const theTask = await apiServices.getOneTaskById(params.taskId);

      this.setState(theTask);
    } catch (error) {
      console.log(error);
    }
  }
 
  render(){
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
