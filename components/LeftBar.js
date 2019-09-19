import React from 'react';
import {View, ScrollView,TouchableOpacity} from 'react-native';
import {Avatar, Badge} from 'react-native-elements'
import {Text,Thumbnail, Button, Icon} from 'native-base'
import {connect} from "react-redux";
import heroesList from './heroes-list'
import monstersList from './monsters-list'
import animalsList from './animals-list'

const mapStateToProps = state => {
  return {
    heroes: state.Heroes,
    animals: state.Animals,
    monsters: state.Monsters
   };
};


class LeftBar extends React.PureComponent {

  renderHeroes = () => {
    const {navigate} = this.props.navigation;
    const heroes = this.props.heroes
    return heroes.map( (hero) => {
      let hero_image = heroesList.heroes[hero.id].image
      return (
        <TouchableOpacity key={hero.id} activeOpacity={0.7} style={{alignItems:'center', marginVertical:3}} onPress={() => {navigate('Hero',{heroId:hero.id})}}>
          <Thumbnail source={hero_image} />
          {hero.curr_hp > 0 ? (
            <Badge status="error" value={hero.curr_hp} containerStyle={{ position: 'absolute', bottom: 0, left: 0 }} textStyle={{fontSize: 10}}/>
          ) : (
            <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
              <Text style={{fontSize: 15}}>☠️</Text>
            </View>
          )}
          <Badge status="warning" value={hero.curr_mp} containerStyle={{ position: 'absolute', bottom: 0, right: 0 }} textStyle={{fontSize: 10}}/>
        </TouchableOpacity>)
    })
  }

  renderAnimals = () => {
    const {navigate} = this.props.navigation;
    const animals = this.props.animals
    return animals.map( (animal) => {
      let animal_image = animalsList.animals[animal.id].image
      return (
        <TouchableOpacity key={animal.id} activeOpacity={0.7} style={{alignItems:'center', marginVertical:3}} onPress={() => {navigate('Animal',{animalId:animal.id})}}>
          <Thumbnail source={animal_image} />
          {animal.curr_hp > 0 ? (
          <Badge status="error" value={animal.curr_hp} containerStyle={{ position: 'absolute', bottom: 0, left: 0 }} textStyle={{fontSize: 10}}/>
          ) : (
          <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
            <Text style={{fontSize: 15}}>☠️</Text>
          </View>
          )}
        </TouchableOpacity>)
    })
  }

  renderMonsters = () => {
    const {navigate} = this.props.navigation;
    const monsters = this.props.monsters
    return monsters.map( (monster,i) => {
      let monster_image = monstersList.monsters[monster.id].image
      return (
        <TouchableOpacity key={monster.id+"-"+i} activeOpacity={0.7} style={{alignItems:'center', marginVertical:3}} onPress={() => {navigate('Monster',{monsterId:monster.id,monsterKey: i})}}>
          <Thumbnail source={monster_image} />
          {monster.curr_hp > 0 ? (
          <Badge status="error" value={monster.curr_hp} containerStyle={{ position: 'absolute', bottom: 0, left: 0 }} textStyle={{fontSize: 10}}/>
          ) : (
          <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
            <Text style={{fontSize: 15}}>☠️</Text>
          </View>
          )}
        </TouchableOpacity>)
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={{ width: 55,height: '100%',flexDirection: 'column', backgroundColor: '#666666',alignItems:'center'}}>
        <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center', marginVertical: 3}}>
          {this.renderHeroes()}
          {this.renderAnimals()}
          {this.renderMonsters()}
        </ScrollView>
        <Avatar
                size="medium"
                overlayContainerStyle={{backgroundColor: 'white'}}
                onPress={() => {navigate('AddEntity')}}
                activeOpacity={0.7}
                rounded
                containerStyle={{marginVertical: 3}}
                icon={{
                  name:'plus',
                  color:'grey',
                  type:'material-community',
                  size: 35
                }}
            />
      </View>
    )
  }
}

export default connect(mapStateToProps)(LeftBar);
