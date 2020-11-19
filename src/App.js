import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Navbar from './components/navbar/Navbar';
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails';
 
class App extends Component {
  state = {
    isUserAuthenticated: false,
  }

  render() {
    return (
      <div className="App">
       <Navbar isUserAuth={this.state.isUserAuthenticated} />

        <Switch>
          {/* Rotas Publicas */}
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />

          {/* Rotas Privadas */}
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/tasks/:taskId" component={TaskDetails} />
        </Switch>
      </div>
    );
  }
}
 
export default App;
