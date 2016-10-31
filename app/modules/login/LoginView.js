import React, { Component, PropTypes} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

class LoginView extends Component {
  propTypes: {

  }
  // companyLogin () {
  //   return ()
  // }
  constructor () {
    super();
    this.state = {companyname: ""};
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
          <TouchableHighlight onPress={this.companyLogin}>
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
    backgroundColor: "rgba(250,155,145,1)",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
  welcomeText: {
    margin: 20
  },
  textField: {


  },
  loginContent: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  inputContainer: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginBottom: 20
  },
  input: {
    width: 300,
    height: 70,
    borderWidth: 1,
    borderColor: "gray",
    padding: 20
  },
  loginButton: {
    backgroundColor: '#ff5454',
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
    marginTop: 50
  },
  textstyle: {
    fontWeight: "bold",
    color: '#FFF',
    fontSize: 24
  },
  whiteFont: {
    fontSize: 20,
    color: '#FFF'
  },
});

export default LoginView;
