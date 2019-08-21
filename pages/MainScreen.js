import React from 'react';
import {Text} from 'react-native';
import {} from 'native-base'
import LeftRightBar from '../components/LeftRightBar'

class MainScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LeftRightBar navigation={this.props.navigation}>
        <Text style={{color:'white'}}> Ciao </Text>
      </LeftRightBar>
    );
  }
}
export default MainScreen;

/*


*/
