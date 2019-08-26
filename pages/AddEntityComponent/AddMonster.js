import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-elements'
import {Tab, Tabs } from 'native-base';
import LeftRightBar from '../../components/LeftRightBar'
import monstersList from '../../components/monsters-list'

class AddMonster extends React.PureComponent {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LeftRightBar navigation={this.props.navigation}>
        <Tabs>
          <Tab heading="Tab1">
            <Text> Tab1 </Text>
          </Tab>
          <Tab heading="Tab2">
            <Text> Tab2 </Text>
          </Tab>
          <Tab heading="Tab3">
            <Text> Tab3 </Text>
          </Tab>
        </Tabs>
      </LeftRightBar>
    );
  }
}
export default AddMonster;
