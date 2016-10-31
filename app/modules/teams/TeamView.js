import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  ListView,
  TextInput
} from 'react-native';
import THUMBS from '../../../docs/images/defaultImage_tn.jpg';
//import teams from '../../../docs/teams.json';
const teams = [
  {img: "image1", name: "team1"},
  {img: "image2", name: "team2"},
  {img: "image3", name: "team3"},
  {img: "image4", name: "team4"},
  {img: "image5", name: "team5"},
  {img: "image1", name: "team1"},
  {img: "image2", name: "team2"},
  {img: "image3", name: "team3"},
  {img: "image4", name: "team4"},
  {img: "image5", name: "team5"},
  {img: "image1", name: "team1"},
  {img: "image2", name: "team2"},
  {img: "image3", name: "team3"},
  {img: "image4", name: "team4"},
  {img: "image5", name: "team5"},
]
class TeamView extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      teamDataSource: ds.cloneWithRows(teams),
    };
  }

  render () {
    return (
      <View style={styles.teamContainer}>
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>
            Teams
          </Text>
        </View>
      <ListView
        dataSource={this.state.teamDataSource}
        renderRow={(team) => { return this.renderTeamRow(team)}}
      />
      </View>
    );
  }

  renderTeamRow (team) {
    const imgSource = THUMBS;
    return (
        <View style={styles.teamRow}>
          <Image style={styles.thumb} source={imgSource} />
          <View style={styles.teamContent}>
            <View style={styles.teamText}>
              <Text style={styles.teamName}>{team.name}</Text>
            </View>
            <View style={styles.allButtons}>
              <View>
                <TouchableHighlight>
                  <Image
                    style={styles.numButton}
                    source={require('../../../docs/images/buttonImages/nro1.png')}
                  />
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight>
                  <Image
                    style={styles.numButton}
                    source={require('../../../docs/images/buttonImages/nro2.png')}
                  />
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight>
                  <Image
                    style={styles.numButton}
                    source={require('../../../docs/images/buttonImages/nro3.png')}
                  />
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight>
                  <Image
                    style={styles.numButton}
                    source={require('../../../docs/images/buttonImages/nro4.png')}
                  />
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight>
                  <Image
                    style={styles.numButton}
                    source={require('../../../docs/images/buttonImages/nro5.png')}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  teamContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "rgba(250,155,145,1)"
  },
  headerStyle: {
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 20
  },
  teamRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 100,
    borderColor: "gray",
    borderWidth: 1
  },
  teamContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  allButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  teamText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  thumb: {
    marginLeft: 20,
    height: 50,
    width: 50
  },
  teamName: {
    marginLeft: 20,
    fontSize: 20
  },
  pointInput: {
    height: 30,
    width: 30,
    borderColor: "black",
    borderWidth: 3,
    marginLeft: 20,
    marginTop: 10,
  },
  numButton: {
    height: 30,
    width: 30,
    margin: 5
  }
});

export default TeamView;
