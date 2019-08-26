import React from 'react';
import {View,SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import {Button, Header, Avatar, Icon} from 'react-native-elements'
import {} from 'native-base'
import DungeonHeroLevels from './DungeonHeroLevels'



class RightBar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isVisible:false,
    }
  }

  toggleModal = (visibility) => {
    this.setState({isVisible: visibility})
  }

  handleEdit = () => {
    // Need to check to prevent null exception.
    this.props.editFunction?.(); // Same as this.props.onPress && this.props.onPress();
  }

  handleAnimal = () => {
    // Need to check to prevent null exception.
    this.props.animalFunction?.(); // Same as this.props.onPress && this.props.onPress();
  }

  handleDelete = () => {
    // Need to check to prevent null exception.
    this.props.deleteFunction?.(); // Same as this.props.onPress && this.props.onPress();
  }

  render() {
    const {navigate} = this.props.navigation;
    const {hero_levels,dungeon_level} = this.state
    return(
      <View style={{width: 55,height: '100%', alignItems:'center',justifyContent:'space-between', backgroundColor: '#666666',flexDirection: 'column'}}>
        <Icon raised
              name='compass'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-start'}}
              onPress={() => this.toggleModal(!this.state.isVisible)}
        />
        {/*Selezione Livello eroi e Livello Dungeon*/}
        <DungeonHeroLevels isVisible={this.state.isVisible} toggleFunction={this.toggleModal}/>

        {this.props.animalFunction && (
          <Icon raised
              name='dog-side'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-end'}}
              onPress={() => this.handleAnimal()}
        />)}

        {this.props.editFunction && (
          <Icon raised
              name='account-edit'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-end'}}
              onPress={() => this.handleEdit()}
        />)}
        {this.props.cancelFunction && (
          <Icon raised
              name='close-circle'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-end'}}
              onPress={() => this.handleDelete()}
        />)}
      </View>
    )
  }
}

export default RightBar;
