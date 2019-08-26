import React from 'react';
import {View,SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import {Button, Header, Avatar, Icon} from 'react-native-elements'
import {Picker, Form, Item,Text} from 'native-base'
import produce from 'immer';
import Popup from './Popup'
import {connect} from "react-redux";
import {setLevels} from '../redux/actions/act-settings'

const mapStateToProps = state => {
  return {
    settings: state.Settings,
   };
};

const mapDispatchToProps = dispatch => {
  return {
    setLevels: settings => dispatch(setLevels(settings)),
  };
};

class DungeonHeroLevels extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      hero_levels: [null, null, null, null, null],
      dungeon_level: null,
    }
  }

  componentDidMount() {
      this.setState({
        hero_levels: [...this.props.settings.hero_levels],
        dungeon_level: this.props.settings.dungeon_level,
      })
  }
  componentDidUpdate(prevProps) {
      if(prevProps.settings !== this.props.settings){
        this.setState({
          hero_levels: [...this.props.settings.hero_levels],
          dungeon_level: this.props.settings.dungeon_level,
        })
      }
  }

  levelPicker = (id,max) => {
    var pickerItems=[];
    for(var i = 1; i <= max; i++)
      pickerItems.push(<Picker.Item key = {id||i} label={i.toString()} value={i} />)
    return pickerItems;
  }
  submitFunction = () => {
    this.props.setLevels(this.state)
  }

  render() {
    const {hero_levels,dungeon_level} = this.state
    return(
      <Popup
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        height='90%'
        width='60%'>
        <Form>
          {hero_levels.map((hero_level,i) => {
          return(
          <Item key={i} picker>
            <Text style={{flex:1}}>Eroe {i+1}</Text>
            <Picker key={i}
              selectedValue={hero_level}
              style={{ flex:1,width: undefined }}
              onValueChange={ itemValue =>
                this.setState(produce(draft => {
                  draft.hero_levels[i] = itemValue
                }))}>
              <Picker.Item label="Seleziona il livello" value={null}/>
              {this.levelPicker(i,100)}
            </Picker>
          </Item>
          )
          })}
          {/*Dungeon Picker*/}
          <Item key={"dungeon"} picker>
            <Text style={{flex:1}}>Dungeon </Text>
            <Picker key={"dungeon"}
              selectedValue={dungeon_level}
              style={{ flex:1,width: undefined }}
              onValueChange={ itemValue =>
                this.setState(produce(draft => {
                  draft.dungeon_level = itemValue
                }))}>
              <Picker.Item label="Seleziona il livello" value={null}/>
              {this.levelPicker("dungeon",12)}
            </Picker>
          </Item>
        </Form>
      </Popup>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DungeonHeroLevels);
