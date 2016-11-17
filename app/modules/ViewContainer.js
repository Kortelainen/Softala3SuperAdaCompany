import React, { Component, PropTypes } from 'react';
import { Navigator } from 'react-native';
import TeamView from './teams/TeamView';
import LoginView from './login/LoginView';

import {setConfiguration} from '../utils/configuration';

const apiRoot = 'http://localhost:3000';

export default class ViewContainer extends Component {
  constructor () {
    super();
    setConfiguration('API_ROOT', apiRoot);
    this.state = {token: ''};
  }

  render () {
//    if (this.state.token !== '') {
      return (
        <Navigator
          initialRoute = {{
            id: 'Login'
          }}
          renderScene={
            this.navigatorRenderScene.bind(this)
          }
          />
        //<LoginView />
        //<TeamView />
      );
//    }
    // return (
    //      <LoginView />
    // )
  }

  updateToken(token){
    this.setState({token})
    setConfiguration('TOKEN', token);
  }

  navigatorRenderScene(route,navigator) {
    _navigator = navigator;

    switch (route.id) {
      case 'Login':
        return(<LoginView token={this.state.token} updateToken={(token) => this.updateToken(token)} navigator={navigator} title="Login" />)
      case 'TeamView':
        return(<TeamView token={this.state.token} updateToken={(token) => this.updateToken(token)} navigator={navigator} title="Teams" />)
    }
  }
}
