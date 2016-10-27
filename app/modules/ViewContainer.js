import React, { Component, PropTypes } from 'react'
import TeamView from './teams/TeamView';

export default class ViewContainer extends Component {
  constructor () {
    super();
    this.state = {token: ''};
  }

  render () {
//    if (this.state.token !== '') {
      return (
        <TeamView />
      )
//    }
    // return (
    //   <LoginView />
    // )
  }
}
