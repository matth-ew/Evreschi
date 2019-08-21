import React from 'react';
import {View, ImageBackground} from 'react-native';
import { Button, Text } from 'react-native-elements';
import background from '../assets/background.jpg'


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1,marginVertical: '10%', marginHorizontal: '25%',backgroundColor: '#fff',alignItems:'center',}}>
          <View style={{
          flexDirection: 'column',
          alignItems:'center',
        /*  marginTop: '10%',
          marginBottom: '10%',
          marginLeft: '25%',
          marginRight: '25%',*/
          padding: '3%',
          justifyContent: 'space-around'
          }}>
            <Text h1>Evreschi</Text>
            <Button
              title="Nuova Partita"
              onPress={() => {this.setState({ isVisible: false }); navigate('Main', {mod: 'New'})}}
            />
            <Button
              title="Carica"
              onPress={() => {this.setState({ isVisible: false }); navigate('Main', {mod: 'Load'})}}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}






export default HomeScreen;
