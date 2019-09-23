import React from 'react';
import {TextInput} from 'react-native'
import {Icon, Item, ListItem, Form, Text, CheckBox, Body, View, Picker} from 'native-base'
import Popup from '../../components/Popup'

class DamagePopup extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      dice: null,
      multiplier: null,
      critical: false,
      poison: false,
      burn: false,
    }
  }

  submitFunction = () => {
    console.log(this.state)
    const {dice,multiplier,critical,poison,burn} = this.state
    this.props.submitDamage(dice,multiplier,critical,poison,burn);
    this.resetStats();
  }

  cancelFunction = () => {
    this.resetStats();
  }

  resetStats = () => {
    this.setState({
      dice: null,
      critical: false,
      poison: false,
      burn: false,
    })
  }

  itemPicker = (monster_multiplier) => {
    return monster_multiplier.map(val => {
      return <Picker.Item key = {"multiplier-"||val} label={val.toString()} value={val} />
    })
  }

  diceHandler = (val) => {
    const newVal =val.replace(/[^0-9]/g, "");
    this.setState({dice:newVal})
  }

  componentDidMount() {
    if(this.props.monster_multiplier){
      this.setState({multiplier: this.props.monster_multiplier[0]})
    }
  }

  render() {
    const {dice,multiplier,critical,poison,burn} = this.state
    let isDisabled = ( (dice && (poison || burn)) ? true : false)
    return (
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        height='60%' width='60%' flex={4}>
        <Form style={{flex: 1}}>
          <Item style={{flex:1}}>
            <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
              <Icon active name="dice-multiple" type='MaterialCommunityIcons' style={{color:"black",flex:1}} />
              <TextInput disableFullscreenUI={true} style={{fontSize: 13,flex:3}} allowFontScaling={true} numberOfLines={1} placeholder="Risultato Dadi" keyboardType={'numeric'} value={dice} onChangeText={this.diceHandler}/>
            </View>
            {this.props.monster_multiplier && (
              <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                <Text style={{flex:1,fontSize: 15}} allowFontScaling={true} numberOfLines={1}>Moltiplicatore</Text>
                <Picker key={"multiplier"}
                  selectedValue={multiplier}
                  style={{ flex:1, width: undefined }}
                  onValueChange={ itemValue =>
                    this.setState({multiplier: itemValue})
                  }>
                  {this.itemPicker(this.props.monster_multiplier)}
                </Picker>
              </View>
            )}
          </Item>
          <ListItem style={{flex:1}} button onPress={() => this.setState({critical:!critical})}>
            <CheckBox color="grey" checked={critical} onPress={() => this.setState({critical:!critical})}/>
            <Body>
              <Text>Critico</Text>
            </Body>
          </ListItem>
          {this.props.poison_burning && (
            <View style={{flex:1}}>
              <ListItem  style={{flex:1}} itemDivider/>
              <ListItem style={{flex:2}}>
                  <CheckBox color="grey" checked={poison} onPress={() => this.setState({poison:!poison})} />
                  <Body>
                    <Text>Veleno</Text>
                  </Body>
                  <CheckBox color="grey" checked={burn} onPress={() => this.setState({burn:!burn})} />
                  <Body>
                    <Text>Bruciatura</Text>
                  </Body>
              </ListItem>
            </View>
          )}
        </Form>
      </Popup>
    );
  }
}

export default DamagePopup;
