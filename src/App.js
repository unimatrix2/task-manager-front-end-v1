import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Navbar from './components/navbar/Navbar';
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails';

import localStorageUtils from './utils/localStorage.utils';
 
class App extends Component {
  constructor() {
    super();

    this.state = {
      isUserAuthenticated: false,
    }

    this.verifyAuthenticatedUser();
  }

  verifyAuthenticatedUser = () => {
    const token = localStorageUtils.get();

    if (token) {
      this.state.isUserAuthenticated = true;
    }
  }

  changeUserAuthStatus = (status) => {
    this.setState({ isUserAuthenticated: status });
  }

  logoutUser = () => {
    localStorageUtils.delete();

    this.changeUserAuthStatus(false);
  }

  render() {
    const { isUserAuthenticated } = this.state;

    return (
      <div className="App">
        <Navbar isUserAuth={isUserAuthenticated} logoutUser = {this.logoutUser} />

        <Switch>
          {/* Rotas Publicas */}
          <Route exact path="/" render={(props) => <Login {...props} changeUserAuthStatus={this.changeUserAuthStatus} />} />
          <Route exact path="/signup" component={Signup} />

          {/* Rotas Privadas */}
          {isUserAuthenticated ? <Route exact path="/projects" component={ProjectList}/> : <Redirect to="/" />}
          {isUserAuthenticated ? <Route exact path="/projects/:id" component={ProjectDetails} /> : <Redirect to="/" />}
          {isUserAuthenticated ? <Route exact path="/tasks/:taskId" component={TaskDetails} /> : <Redirect to="/" />}
        </Switch>
      </div>
    );
  }
}
 
export default App;
