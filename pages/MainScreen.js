import React from 'react';
import {Text} from 'react-native';
import {} from 'native-base'
import LeftRightBar from '../components/LeftRightBar'

class MainScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LeftRightBar navigation={this.props.navigation}>
        <Text style={{color:'white'}}> La schermata Main è sempre vuota,
         e ci arrivi dalla Home o con il tasto "Home" in crea Eroe e Mostro
         N.B. qui ci andrà la logica di get dei dati dal DB SQLite
        </Text>
      </LeftRightBar>
    );
  }
}
export default MainScreen;
