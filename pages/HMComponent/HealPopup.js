import React from 'react';
import {Icon, Input, Item, ListItem, Form, Text, CheckBox, Body, View, Picker} from 'native-base'
import Popup from '../../components/Popup'

class HealPopup extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      hp_heal: null,
      mp_heal: null,
      total_heal: false,
    }
  }

  submitFunction = () => {
    const {total_heal,hp_heal,mp_heal} = this.state
    this.props.submitHeal(total_heal,hp_heal,mp_heal);
    this.resetStats();
  }

  cancelFunction = () => {
    this.resetStats();
  }

  hpHealHandler = (val) => {
    const newVal =val.replace(/[^0-9]/g, "");
    this.setState({hp_heal:newVal})
  }

  mpHealHandler = (val) => {
    const newVal =val.replace(/[^0-9]/g, "");
    this.setState({mp_heal:newVal})
  }

  resetStats = () => {
    this.setState({
      hp_heal: null,
      mp_heal: null,
      total_heal: false,
    })
  }

  render() {
    const {hp_heal,mp_heal,total_heal} = this.state
    return (
      <Popup
        isDisabled={this.props.isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.props.cancelFunction}
        toggleFunction={this.props.toggleFunction}>
        <Form style={{flex:1}}>
          <Item style={{flex:1}}>
            <Icon active name="beaker" style={{color:"red"}} />
            <Input allowFontScaling={true} numberOfLines={1} placeholder="Punti Vita" keyboardType={'numeric'} value={hp_heal} onChangeText={this.hpHealHandler}/>
          </Item>
          {this.props.mana && (
            <Item style={{flex:1}}>
              <Icon active name="beaker" style={{color:"#faad14"}} />
              <Input allowFontScaling={true} numberOfLines={1} placeholder="Punti Mana" keyboardType={'numeric'} value={mp_heal} onChangeText={this.mpHealHandler}/>
            </Item>
          )}
          <ListItem  style={{flex:1}} button onPress={() => this.setState({total_heal:!total_heal})}>
            <CheckBox color="grey" checked={total_heal} onPress={() => this.setState({total_heal:!total_heal})}/>
            <Body>
              <Text>Cura tutto</Text>
            </Body>
          </ListItem>
        </Form>
      </Popup>
    );
  }
}

export default HealPopup;
