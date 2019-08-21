import React from 'react';
import {View, ScrollView,TouchableOpacity} from 'react-native';
import {Avatar, Icon, Badge} from 'react-native-elements'
import {Text,Thumbnail, Button} from 'native-base'
import {connect} from "react-redux";
import heroesList from '../pages/AddEntityComponent/heroes-list'
//import monstersList from '../pages/AddEntityComponent/monsters-list'

const mapStateToProps = state => {
  return {
    heroes: state.Heroes,
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
        <TouchableOpacity key={hero.id} activeOpacity={0.7} style={{alignItems:'center', marginVertical:3}} onPress={() => {navigate('HeroScreen',{heroId:hero.id})}}>
          <Thumbnail source={hero_image} />
          <Badge status="error" value={hero.hp} containerStyle={{ position: 'absolute', bottom: 0, left: 0 }} textStyle={{fontSize: 10}}/>
          <Badge status="warning" value={hero.mp} containerStyle={{ position: 'absolute', bottom: 0, right: 0 }} textStyle={{fontSize: 10}}/>
        </TouchableOpacity>)
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={{ width: 55,height: '100%',flexDirection: 'column', backgroundColor: '#666666',alignItems:'center'}}>
        <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center', marginVertical: 3}}>
          {this.renderHeroes()}
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
