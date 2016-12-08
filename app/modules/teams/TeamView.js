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
  AsyncStorage,
  Alert
} from 'react-native';
import THUMBS from '../../../docs/images/defImg.jpeg';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {post, get} from '../../utils/api'
const teams = []
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var teampoints = 0
var teamId = 0
var button = 0
var name = ''

var radio_props = [
  {label: '1', value: 1 },
  {label: '2', value: 2 },
  {label: '3', value: 3 },
  {label: '4', value: 4 },
  {label: '5', value: 5 }
];
class TeamView extends Component {

  givePoints(teampoints, teamId, name) {
      Alert.alert(
        'Olet antamassa ' + teampoints + ' pistettä tiimille ' + name,
        'Vahvista pisteet painamalla OK',
        [
          {text: 'OK', onPress: () => this.savePoints(teampoints,teamId)},
          {text: 'Peruuta', onPress: () => this.cancel()}
        ]
      )
  }

  async savePoints(teampoints, teamId) {
      const response = await post('/companypoint', {
              teamId: teamId,
              point: teampoints
          }, this.props.token)
          var report = response.success
  }

  cancel() {
    teams = []
    this.setState({ teamDataSource: ds.cloneWithRows(teams) });
    this.getNewDataSource()
  }

  clearPoints(value, teamId, name, teamPoint) {
    Alert.alert(
      'Olet poistamassa antamasi pisteet tiimiltä: ' + name,
      'Vahvista pisteiden poisto painamalla OK',
      [
        {text: 'OK', onPress: () => this.clearPointsDB(teamId, teamPoint)},
        {text: 'Peruuta'}
      ]
    )
  }

  async clearPointsDB(teamId, teamPoint) {
      const response = await post('/clearPoints', {
              teamId: teamId
          }, this.props.token)
          teams = []
          this.setState({ teamDataSource: ds.cloneWithRows(teams) });
          this.getNewDataSource()
  }

  async getNewDataSource() {
    const response = await post('/teamList', {
        searchfilter: "",
      }, this.props.token)
    var allTeamsList = response.result
    for (var i = 0; i < allTeamsList.length; i++) {
	       teams.push({"img": allTeamsList[i].file,"name": allTeamsList[i].teamName, "teamId": allTeamsList[i].teamId, "point": allTeamsList[i].point});
	      }
    this.setState({ teamDataSource: ds.cloneWithRows(teams) });

  }

  async filterTeams(searchString) {
    var filteredTeamsList = []
    for (var i = 0; i < teams.length; i++) {
      if (teams[i].name.toLowerCase().includes(searchString.toLowerCase())) {
         filteredTeamsList.push({"img": teams[i].img,"name": teams[i].name, "teamId": teams[i].teamId, "point": teams[i].point});
      }
    }
    this.setState({ teamDataSource: ds.cloneWithRows(filteredTeamsList) });
  }


  constructor() {
    super();
    this.state = {
      searchString: '',
      teamDataSource: ds.cloneWithRows(teams),
    };
  }

  async componentDidMount() {
    const response = await post('/teamList', {
        searchfilter: "",
      }, this.props.token)

    var allTeamsList = response.result
    for (var i = 0; i < allTeamsList.length; i++) {
      teams.push({"img": allTeamsList[i].file, "name": allTeamsList[i].teamName, "teamId": allTeamsList[i].teamId, "point": allTeamsList[i].point});
    }
      this.setState({ teamDataSource: ds.cloneWithRows(teams) });
  }

  render () {
    return (
      <View style={styles.teamContainer}>
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>
            Teams
          </Text>
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.searchBar}
            onChangeText={(searchString) => {
              this.setState({searchString});
              this.filterTeams(searchString);
              }}
            value={this.state.searchString}
            placeholder='Search...'
            />
        </View>
      <ListView
        enableEmptySections={true}
        keyboardShouldPersistTaps={true}
        dataSource={this.state.teamDataSource}
        renderRow={(team) => { return this.renderTeamRow(team)}}
      />
      </View>
    );
  }

  renderTeamRow (team) {
    var imgSource = THUMBS;
    if(team.img != null){
      imgSource = {uri: 'data:image/png;base64,' + team.img, isStatic: true}
    }

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
                name={team.teamId}
                style={styles.radioButton}
                radio_props={radio_props}
                initial={team.point-1}
                labelHorizontal={false}
                labelStyle={{fontSize: 16, color: '#FFF'}}
                buttonColor={'#FFF'}
                formHorizontal={true}
                onPress={(value) => { this.givePoints( value, team.teamId, team.name)}}
                />
                </View>
                {/* <TouchableHighlight>
                  <Image
                    style={styles.star}
                    source={require('../../../docs/images/star2.png')}
                  />
                </TouchableHighlight>*/}
                <TouchableHighlight
                onPress={(value) => { this.clearPoints( value, team.teamId, team.name, team.point)}}
                style={{marginLeft: 10}}>
                  <Image
                    style={styles.numButton}
                    source={require('../../../docs/images/buttonImages/x_white.png')}
                  />
                </TouchableHighlight>

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
    backgroundColor: "#FAFAFA"
  },
  headerStyle: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: '#FAFAFA'

  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#FF0036',
    marginTop: 10,
    marginLeft: 20
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  searchBar: {
    width: 300,
    height: 50,
    color: '#000',
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 5
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 110,
    backgroundColor: '#FF0036',
    marginBottom: 10,
    borderRadius: 15,
  },
  teamContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",

  },
  allButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  teamText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  thumb: {
    marginLeft: 20,
    height: 70,
    width: 70,
    borderWidth: 0,
    borderRadius: 35
  },
  teamName: {
    marginLeft: 20,
    fontSize: 20,
    color: '#FFF'
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
    height: 25,
    width: 25,
    marginLeft:15,
    marginTop: 5
  },
  star: {
    height:29,
    width:29,
    marginLeft: 10,

  }
});

export default TeamView;
