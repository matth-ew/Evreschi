import React from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import {Button,Icon} from 'react-native-elements'
import {Thumbnail,Text} from 'native-base'
import LeftRightBar from '../../components/LeftRightBar'
import AddHeroStats from './AddHeroStats'
import heroesList from '../../components/heroes-list'
import {connect} from "react-redux";
import {addHero} from '../../redux/actions/act-heroes'

const mapStateToProps = state => {
  return {
    heroes: state.Heroes,
   };
};

const mapDispatchToProps = dispatch => {
  return {
    addHero: hero => dispatch(addHero(hero)),
  };
};

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
    const hero = {heroId,heroHp,heroMp,heroDef};
    this.props.addHero(hero)
  }

  setHero = (heroId) => {
    this.setState({heroId:heroId})
  }
  renderHeroes = () => {
    const {heroes,heroesIds} = heroesList
    return heroesIds.map( (heroId) => {
      const hero = heroes[heroId]
      let isDisabled = false;
      if(this.props.heroes.find(elem => elem.id == heroId)) isDisabled = true;
      return (
        <TouchableOpacity key={heroId} disabled={isDisabled} activeOpacity={0.7} style={{alignItems:'center',width: '33%', marginVertical:10}} onPress={() => {this.toggleModal(true);this.setHero(heroId)}}>
          <Thumbnail square large source={hero.image} style={isDisabled?{opacity: 0.3}:{}}  />
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
        <AddHeroStats isVisible={this.state.isVisible} toggleFunction={this.toggleModal} createHero={(heroHp,heroMp,heroDef) => this.createHero(this.state.heroId,heroHp,heroMp,heroDef)}/>
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
            onPress={() => console.log("UNDO")}
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

export default connect(mapStateToProps,mapDispatchToProps)(AddHero);
