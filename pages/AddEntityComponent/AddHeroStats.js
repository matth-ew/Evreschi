import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Avatar, Button,Icon, Input} from 'react-native-elements';


class AddHeroStats extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      heroHp: null,
      heroMp: null,
      heroDef: null
    }
    this.props.toggleModal.bind(this);
    this.props.createHero.bind(this);
  }

  submitButton = () => {
    const {heroHp,heroMp,heroDef}= this.state
    this.props.createHero(heroHp,heroMp,heroDef);
    this.backButton();
  }

  backButton = () => {
    this.resetStats();
    this.props.toggleModal(!this.props.isVisible);
  }

  resetStats = () => {
    this.setState({
      heroHp: null,
      heroMp: null,
      heroDef: null
    })
  }

  render() {
    if(!this.props.isVisible){
      return (<View/>)
    }
    else return (
        <View style={styles.overlayBackground}>
          <View style={styles.overlay}>
            <Input
              placeholder='Punti Vita'
              leftIcon={
                <Icon
                  name='heart'
                  size={24}
                  color='red'
                  type='material-community'
                />
              }
              keyboardType={'numeric'}
              onChangeText={(heroHp) => this.setState({heroHp})}
            />
            <Input
              placeholder='Punti Mana'
              leftIcon={
                <Icon
                  name='water'
                  size={24}
                  color='blue'
                  type='material-community'
                />
              }
              keyboardType={'numeric'}
              onChangeText={(heroMp) => this.setState({heroMp})}
            />
            <Input
              placeholder='Difesa'
              leftIcon={
                <Icon
                  name='shield'
                  size={24}
                  color='black'
                  type='material-community'
                />
              }
              keyboardType={'numeric'}
              onChangeText={(heroDef) => this.setState({heroDef})}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%'
              }}
            >
              <TouchableOpacity
                onPress={this.submitButton}>
                <Text>Crea</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.backButton}>
                <Text>Annulla</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
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


export default AddHeroStats;
