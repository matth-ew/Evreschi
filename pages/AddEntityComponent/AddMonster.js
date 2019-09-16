import React from 'react';
import {StyleSheet, TouchableOpacity } from 'react-native';
import {Button,Icon} from 'react-native-elements'
import {Thumbnail,Text, Tab, Tabs, TabHeading,ScrollableTab, View, H2} from 'native-base'
import LeftRightBar from '../../components/LeftRightBar'
import AddMonsterPopup from './AddMonsterPopup'
import monstersList from '../../components/monsters-list'
import {connect} from "react-redux";
import {addMonster} from '../../redux/actions/act-monsters'

const mapStateToProps = state => {
  return {
    monsters: state.Monsters,
    settings: state.Settings,
   };
};

const mapDispatchToProps = dispatch => {
  return {
    addMonster: monster => dispatch(addMonster(monster)),
  };
};


class AddMonster extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      monsterId: null
    }
  }

  toggleModal = (visible) =>  {
    this.setState({
      isVisible: visible
    })
  }

  createMonster = (monsterId) => {
    console.log("IN CREAZIONE ",monsterId)
    let monsterHp, monsterDef, fascia = null
    const {dungeons,fasce,monsters,monstersIds} = monstersList
    const {dungeon_level,hero_levels} = this.props.settings;

    //CALCOLO LIVELLO MEDIO DEGLI EROI
    const hero_avg = hero_levels.reduce((a, b) => a + b) / hero_levels.length
    const fasceIds = dungeons[dungeon_level].fasce
    fasceIds.forEach(fasciaId => {
      if(fasce[fasciaId].levels[0] <= hero_avg && hero_avg <= fasce[fasciaId].levels[1] ){
        fascia = fasce[fasciaId]
      }
    })
    if(fascia == null){
      if(hero_avg <= fasce[fasceIds[0]].levels[0]){
        fascia = fasce[fasceIds[0]]
      }
      else{
        fascia = fasce[fasceIds[fasceIds.length-1]]
      }
    }

    monsterHp = fascia.monsters[monsterId].pv
    monsterDef = fascia.monsters[monsterId].def

    const monster = {monsterId,monsterHp,monsterDef};
    this.props.addMonster(monster)
  }

  setMonster = (monsterId) => {
    console.log("ID: ",monsterId)
    this.setState({monsterId:monsterId})
  }

  renderMonsters = (type) => {
    const {dungeons,fasce,monsters,monstersIds} = monstersList
    const {dungeon_level,hero_levels} = this.props.settings;

    let isDisabled = false;
    //if(this.props.monsters.length > 7 ) isDisabled = true;

      return monstersIds.map( (monsterId) => {
        const monster = monsters[monsterId]
        /*if(this.props.heroes.find(elem => elem.id == heroId)) isDisabled = true;*/
        if(type == monster.type && fasce[dungeons[dungeon_level].fasce[0]].monsters[monsterId]){
          return (
            <TouchableOpacity key={monsterId} disabled={isDisabled} activeOpacity={0.7} style={{alignItems:'center',width: '33%', marginVertical:10}} onPress={() => {this.toggleModal(true);this.setMonster(monsterId)}}>
              <Thumbnail square large source={monster.image} style={isDisabled?{opacity: 0.3}:{}}  />
              <Text style={{color:'white'}}>{monster.label}</Text>
            </TouchableOpacity>)
          }
          else return;
      })
  }

  render() {
    const {navigate} = this.props.navigation;
    const {dungeon_level,hero_levels} = this.props.settings;

    if(dungeon_level != null && !hero_levels.some(x => x == null)){
      return (
        <LeftRightBar navigation={this.props.navigation}>
          <Tabs transparent renderTabBar={()=> <ScrollableTab style={{ alignItems: 'center',backgroundColor: "rgba(183, 183, 183, 0.15)" }} />}>
            <Tab heading={<TabHeading style={{backgroundColor:'transparent'}}><Text>Bestie</Text></TabHeading>}
              style={{flex: 1, flexDirection:'row',flexWrap: 'wrap', marginHorizontal: '20%', backgroundColor: 'transparent'}}
            >
              {this.renderMonsters('beast')}
            </Tab>
            <Tab heading={<TabHeading style={{backgroundColor:'transparent'}}><Text>Magici</Text></TabHeading>}
              style={{flex: 1, flexDirection:'row',flexWrap: 'wrap', marginHorizontal: '20%', backgroundColor: 'transparent'}}
            >
              {this.renderMonsters('magical')}
            </Tab>
            <Tab heading={<TabHeading style={{backgroundColor:'transparent'}}><Text>Umanoidi</Text></TabHeading>}
              style={{flex: 1, flexDirection:'row',flexWrap: 'wrap', marginHorizontal: '20%', backgroundColor: 'transparent'}}
            >
              {this.renderMonsters('humanoid')}
            </Tab>
            <Tab heading={<TabHeading style={{backgroundColor:'transparent'}}><Text>Boss</Text></TabHeading>}
              style={{flex: 1, flexDirection:'row',flexWrap: 'wrap', marginHorizontal: '20%', backgroundColor: 'transparent'}}
            >
              {this.renderMonsters('boss')}
            </Tab>
          </Tabs>
          {/*Modal*/}
          <AddMonsterPopup isVisible={this.state.isVisible} toggleFunction={this.toggleModal} createMonster={() => this.createMonster(this.state.monsterId)}/>
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
    else{
      return(
        <LeftRightBar navigation={this.props.navigation}>
          <View style={{flex: 1, flexDirection: 'row',margin:'5%'}}>
            <H2 style={{flex:9, color:'white'}}>
              Per poter inserire i mostri è necessario aggiungere le informazioni di Dungeon e Livello degli Eroi
            </H2>
            <View style={{flex:1,alignItems: 'center',margin:'5%'}}>
              <Icon
                name='arrow-forward'
                color='white'
                size={35}/>
            </View>
          </View>
        </LeftRightBar>
      )
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddMonster);
