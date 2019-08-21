import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Avatar, Button,Icon, Input} from 'react-native-elements'
import LeftRightBar from '../../components/LeftRightBar'
import AddHeroStats from './AddHeroStats'
import heroesList from './heroes-list'

class AddHero extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      heroId: null
    }
  }

  toggleModal = (visible) =>  {
    this.setState({
      isVisible: visible
    })
  }

  createHero = (heroId,heroHp,heroMp,heroDef) => {
    console.log(heroId,heroHp,heroMp,heroDef)
  }

  setHero = (heroId) => {
    this.setState({heroId:heroId})
  }
  renderHeroes = () => {
    const {heroes,heroesIds} = heroesList
    return heroesIds.map( (heroId) => {
      const hero = heroes[heroId]
      return (
        <TouchableOpacity key={heroId} activeOpacity={0.7} style={{alignItems:'center',width: '33%', marginVertical:10}} onPress={() => {this.toggleModal(true);this.setHero(heroId)}}>
          <Avatar size="large" source={hero.image} />
          <Text style={{color:'white'}}>{hero.label}</Text>
        </TouchableOpacity>)
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <LeftRightBar navigation={this.props.navigation}>
        <View style={{flex: 1, flexDirection:'row',flexWrap: 'wrap', marginHorizontal: '20%'}}>
          {this.renderHeroes()}
        </View>

        {/*Modal*/}
        <AddHeroStats isVisible={this.state.isVisible} toggleModal={this.toggleModal} createHero={(heroHp,heroMp,heroDef) => this.createHero(this.state.heroId,heroHp,heroMp,heroDef)}/>
        {/*Bottone Home*/}
          <Button
            icon={
              <Icon
              raised
              name="home"
              size={15}
              color="grey"
              type='material-icons'/>
            }
            title="Home"
            type="clear"
            titleStyle={{color:"white"}}
            containerStyle={{
              position: 'absolute',
              bottom: 10,
              left: 10,
            }}
            onPress={() => {navigate('Main')}}
          />
          {/*Bottone Undo*/}
          <Button
            icon={
              <Icon
              raised
              name="undo"
              size={15}
              color="grey"
              type='material-icons'/>
            }
            title="Undo"
            type="clear"
            titleStyle={{color:"white"}}
            containerStyle={{
              position: 'absolute',
              bottom: 10,
              right: 10,
            }}
          />
      </LeftRightBar>
    );
  }
}


export default AddHero;
