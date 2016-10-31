import React, { Component, PropTypes } from 'react'
import TeamView from './teams/TeamView';
import LoginView from './login/LoginView';

export default class ViewContainer extends Component {
  constructor () {
    super();
    this.state = {token: ''};
  }

  render () {
//    if (this.state.token !== '') {
      return (
        //<LoginView />
        <TeamView />
      )
//    }
    // return (
    //   <LoginView />
    // )
  }
}
