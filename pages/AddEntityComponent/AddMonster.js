import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-elements'
import LeftRightBar from '../../components/LeftRightBar'

class AddMonster extends React.PureComponent {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LeftRightBar navigation={this.props.navigation}>
        <Text style={{color:'red'}}> AddMonster </Text>
      </LeftRightBar>
    );
  }
}
export default AddMonster;
