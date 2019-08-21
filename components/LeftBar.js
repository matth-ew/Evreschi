import React from 'react';
import {Text,View,SafeAreaView, ImageBackground, ScrollView,TouchableOpacity} from 'react-native';
import {Avatar, Icon, Badge} from 'react-native-elements'
import {Thumbnail} from 'native-base'
import {connect} from "react-redux";
import heroesList from '../pages/AddEntityComponent/heroes-list'
//import monstersList from '../pages/AddEntityComponent/monsters-list'

const mapStateToProps = state => {
  return {
    heroes: state.Heroes,
    //advertise: state.Advertise
   };
};


class LeftBar extends React.PureComponent {

  renderHeroes = () => {
    const {navigate} = this.props.navigation;
    const {heroes,heroesIds} = heroesList
    return heroesIds.map( (heroId) => {
      const hero = heroes[heroId]
      return (
        <TouchableOpacity key={heroId} activeOpacity={0.7} style={{alignItems:'center',width: '33%', marginVertical:10}} onPress={() => {navigate('Main')}}>
          <Thumbnail source={hero.image} />
        </TouchableOpacity>)
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={{ width: 55,height: '100%',flexDirection: 'column', backgroundColor: '#666666',alignItems:'center'}}>
        <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center', marginVertical: 3}}>
          {this.renderHeroes()}
          <View style={{marginVertical: 3}}>
            <Avatar size="medium"
              overlayContainerStyle={{backgroundColor: 'red'}}
              onPress={() => {navigate('Main')}}
              activeOpacity={0.7}
              rounded
              icon={{
                name:'sword',
                color:'white',
                type:'material-community'
              }}
              />
              <Badge status="error" value="4" containerStyle={{ position: 'absolute', bottom: 0, left: 0 }} />
              <Badge status="primary" value="4" containerStyle={{ position: 'absolute', bottom: 0, right: 0 }} />
            </View>
            <Avatar size="medium"
              overlayContainerStyle={{backgroundColor: 'blue'}}
              onPress={() => {navigate('Main')}}
              activeOpacity={0.7}
              rounded
              icon={{
                name:'auto-fix',
                color:'white',
                type:'material-community'
              }}
              />
              <Avatar size="medium"
                overlayContainerStyle={{backgroundColor: 'green'}}
                onPress={() => {navigate('Main')}}
                activeOpacity={0.7}
                rounded
                icon={{
                  name:'knife-military',
                  color:'white',
                  type:'material-community'
                }}
                />
              </ScrollView>
              <Avatar
                  size="medium"
                  overlayContainerStyle={{backgroundColor: 'white'}}
                  onPress={() => {navigate('AddEntity')}}
                  activeOpacity={0.7}
                  rounded
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
