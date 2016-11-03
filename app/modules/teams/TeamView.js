import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  TextInput,
  AsyncStorage
} from 'react-native';
import THUMBS from '../../../docs/images/defaultImage_tn.jpg';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//import teams from '../../../docs/teams.json';
const teams = []
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var teampoints = 0
var teamId = 0
var button = 0

var radio_props = [
  {label: '1', value: 1 },
  {label: '2', value: 2 },
  {label: '3', value: 3 },
  {label: '4', value: 4 },
  {label: '5', value: 5 }
];

function _givePoints(teampoints, teamId){
  try {
    fetch('http://localhost:3000/companypoint', {
          method: 'POST',
          body: JSON.stringify({
            teamId: teamId,
            companyId: 1,
            point: teampoints
          })
        })
      .then((response) => response.json())
      .then(response => {
        var report = response.success
        console.log(report)

        //console.log(teams);
      })
    } catch (error) {
      console.log(error);
    }
}

class TeamView extends Component {

  constructor() {
    super();
    this.state = {
      teamDataSource: ds.cloneWithRows(teams),
    };
    try {
      fetch('http://localhost:3000/teamList', {
            method: 'POST',
            body: JSON.stringify({
              searchfilter: "",
            })
          })
        .then((response) => response.json())
        .then(response => {
          var allTeamsList = response.result
          for (var i = 0; i < allTeamsList.length; i++) {
            teams.push({"img": allTeamsList[i].docId,"name": allTeamsList[i].teamName, "teamId": allTeamsList[i].teamId, "point": allTeamsList[i].point});
            this.setState({ teamDataSource: ds.cloneWithRows(teams) });

          }
          //console.log(teams);
        })
      } catch (error) {
        Alert.alert(
            'Yhteys kantaan ei ole päällä',
            ':C',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
      }
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
        enableEmptySections={true}
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

              <RadioForm
                radio_props={radio_props}
                initial={team.point-1}
                labelHorizontal={false}
                formHorizontal={true}

                onPress={(value) => { _givePoints( value, team.teamId)}}
                />
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
