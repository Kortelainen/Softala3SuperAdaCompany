import React, { Component, PropTypes} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
  AsyncStorage,
  Alert
} from 'react-native';

import {post} from '../../utils/api'

const ACCESS_TOKEN = 'access_token';

class LoginView extends Component {
  propTypes: {

  }

  constructor () {
    super();
    this.state = {
      companyname: "",
      error: ""
    }
  }

  storeToken(responseData) {
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
      if(err) {
        console.log("it's an error");
        throw err;
      }
      console.log("it's a success");
    }).catch((err) => {
      console.log("error is " + error)
    });
  }

  async companyLogin () {
    const response = await post('/company/authenticate', {
    name: this.state.companyname
  }, this.props.token);
      console.log(response);
    if (response.success === true) {
      this.props.updateToken(response.token.token);
      this.redirect();
    } else {
      Alert.alert(
        'Yritystä ei löytynyt',
        'Tarkista yrityksen nimi',
        [
          {text: 'OK'}
        ]
      );
    }




    /*
    try {
      let response = await fetch('https://localhost:3000/company/authenticate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyname: this.state.companyname
        })
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        let accessToken = res;
        console.log(accessToken);
        this.storeToken(accessToken);
        this.redirect('TeamView');
      } else {
        let error = res;
        throw error;
      }
    } catch(error) {
      this.setState({error: error});
      console.log("error " + error);
    }*/
  }
  redirect () {
    this.props.navigator.push({
      id: 'TeamView'
    });
  }

  render () {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.header}>
          <Image style={styles.logoImg} source={require('../../../docs/images/superada_transparent.png')} />
        </View>
        <View style={styles.welcomeText}>
          <Text style={styles.whiteFont}>Voit kirjautua sisään sinulle annetulla tunnuksella!</Text>
        </View>
        <View style={styles.loginContent}>
          <View style={styles.inputContainer}>
             <Text style={styles.textstyle}>Yrityksen nimi:</Text>
          </View>
             <View style={styles.textField}>
               <TextInput
                  style={[styles.input, styles.whiteFont]}
                  onChangeText={(companyname) => this.setState({companyname})}
                  value={this.state.companyname}
                  />
              </View>
        </View>
        <View style={styles.loginButton}>
          <TouchableHighlight onPress={this.companyLogin.bind(this)}>
            <View style={styles.login}>
              <Text style={styles.whiteFont}>KIRJAUDU SISÄÄN</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "rgb(255,0,54)",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 30
  },
  welcomeText: {
    marginLeft:30,
    marginTop: 30
  },
  textField: {
    borderColor: '#FFF',
    borderWidth: 1
  },
  loginContent: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  inputContainer: {
    padding: 35,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  input: {
    width: 300,
    height: 45,
    fontSize: 20,
    padding: 10
  },
  loginButton: {
    backgroundColor: '#FF8A8C',
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 300,
    marginTop: 100
  },
  login: {
    justifyContent: "flex-start"
  },
  logoImg: {
    height: 150,
    width: 150,
  },
  textstyle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  whiteFont: {
    fontSize: 18,
    color: '#FFF'
  },
});

export default LoginView;
