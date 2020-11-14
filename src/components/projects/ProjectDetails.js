import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EditProject from './EditProject';
import AddTask from '../tasks/AddTask';

class ProjectDetails extends Component {
  state = {}
 
  componentDidMount(){
    this.getSingleProject();
  }
 
  getSingleProject = () => {
    const { params } = this.props.match;

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/private/list/${params.id}`)
    .then( responseFromApi =>{
      const theProject = responseFromApi.data;
      this.setState(theProject);
    })
    .catch((err)=>{
        console.log(err)
    })
  }
 
// DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/projects/private/delete/${params.id}`)
    .then( () =>{
        this.props.history.push('/projects'); // !!!         
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
        {/* show the task heading only if there are tasks */}
        {this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks </h3> }
        {/* map through the array of tasks and... */}
        {this.state.tasks && this.state.tasks.map((task, index) => {
            return(
                <div key={ index }>
                {/* ... make each task's title a link that goes to the task details page */}
                    <Link to={`/tasks/${task._id}`}> 
                        { task.title }
                    </Link>
                </div>
            )
            
        }) }
        <div>{this.state.title && (
          <EditProject theProject={this.state} {...this.props} />
        )}</div>
        <button onClick={() => this.deleteProject()}>Delete project</button> {/* <== !!! */}
        <br/>
        <div>{this.state.title && (
          <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
        )} </div>
        <br/><br/><br/><br/><br/>
        <Link to={'/projects'}>Back to projects</Link>
      </div>
    )
  }
}
 
export default ProjectDetails;