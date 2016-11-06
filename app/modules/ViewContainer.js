import React, { Component, PropTypes } from 'react';
import { Navigator } from 'react-native';
import TeamView from './teams/TeamView';
import LoginView from './login/LoginView';

export default class ViewContainer extends Component {
  // constructor () {
  //   super();
  //   this.state = {token: ''};
  // }

  render () {
//    if (this.state.token !== '') {
      return (
        <Navigator
          initialRoute = {{
            id: 'TeamView'
          }}
          renderScene={
            this.navigatorRenderScene
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

  navigatorRenderScene(route,navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'Login':
        return(<LoginView navigator={navigator} title="Login" />)
      case 'TeamView':
        return(<TeamView navigator={navigator} title="Teams" />)
    }
  }
}
