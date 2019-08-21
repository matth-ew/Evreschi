import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Button,Text,H1, View} from 'native-base'
import background from '../assets/background.jpg'


class HomeScreen extends React.Component {

  render() {
    const {navigate} = this.props.navigation;
    return (
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
          <View style={styles.overlayBackground}>
            <View style={styles.overlay}>
              <H1 style={{flex: 1,marginVertical: '5%'}}>Evreschi</H1>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%'
              }}>
                <Button primary onPress={() => {navigate('Main', {mod: 'New'})}}>
                  <Text>Nuova Partita</Text>
                </Button>
                <Button success onPress={() => {navigate('Main', {mod: 'Load'})}}>
                  <Text>Carica</Text>
                </Button>
              </View>
            </View>
          </View>
        </ImageBackground>
    );
  }
}


export const styles = StyleSheet.create({
  overlayBackground: {
    position: "absolute",
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  overlay: {
    position: "absolute",
    top: '25%',
    right: '25%',
    bottom: '25%',
    left: '25%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 2
  }
});




export default HomeScreen;
