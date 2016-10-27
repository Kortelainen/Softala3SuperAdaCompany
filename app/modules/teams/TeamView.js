import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  ListView,
  //Image
} from 'react-native';
//import teams from '../../../docs/teams.json';

class TeamView extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['team 1', 'team 2', 'team 3', 'team 4', 'team 5']),
    };
  }

  render () {
    return (
      <View style={styles.teamContainer}>
        <Text>
          Teams
        </Text>
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(data) => <View><Text>{data}</Text></View>}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  teamContainer: {
    flex: 1,
    marginTop: 20
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});

export default TeamView;
