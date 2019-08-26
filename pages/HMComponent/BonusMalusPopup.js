import React from 'react';
import {Icon, Input, Item, ListItem, Form, Text, CheckBox, Body, View, Picker} from 'native-base'
import Popup from '../../components/Popup'

class BonusMalusPopup extends React.PureComponent {

    constructor (props) {
      super(props)
      this.state = {
        bonus: null,
        malus: null,
        remove: false,
      }
    }

    submitFunction = () => {
      console.log(this.state)
      const {bonus,malus,remove} = this.state
      this.props.submitBonusMalus(bonus,malus,remove);
      this.resetStats();
    }

    cancelFunction = () => {
      this.resetStats();
    }

    resetStats = () => {
      this.setState({
        bonus: null,
        malus: null,
        remove: false,
      })
    }

    bonusHandler = (val) => {
      const newVal =val.replace(/[^0-9]/g, "");
      this.setState({bonus:newVal,malus:null,remove:false})
    }

    malusHandler = (val) => {
      const newVal =val.replace(/[^0-9]/g, "");
      this.setState({malus:newVal,bonus:null,remove:false})
    }

    removeHandler = (value) => {
      if(value){
        this.setState({remove: true,malus:null,bonus:null})
      }
      else
        this.setState({remove: false})
    }

  render() {
    const {bonus,malus,remove} = this.state
    const isDisabled = ((!bonus && !malus && !remove) ? true : false)
    return (
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        height="60%">
          <Text>Specificare il bonus o il malus della difesa</Text>
          <Form>
            <Item>
              <Icon active name="plus" type='MaterialCommunityIcons' style={{color:"green"}} />
              <Icon name='shield' type='MaterialCommunityIcons' style={{color:"green"}}/>
              <Input allowFontScaling={true} numberOfLines={1} placeholder="Bonus" keyboardType={'numeric'} value={bonus} onChangeText={this.bonusHandler}/>
            </Item>
            <Item>
              <Icon active name="minus" type='MaterialCommunityIcons' style={{color:"red"}} />
              <Icon name='shield' type='MaterialCommunityIcons' style={{color:"red"}}/>
              <Input allowFontScaling={true} numberOfLines={1} placeholder="Malus" keyboardType={'numeric'} value={malus} onChangeText={this.malusHandler}/>
            </Item>
            <ListItem button onPress={() => this.setState({remove:!remove})}>
              <CheckBox color="grey" checked={remove} onPress={() => this.removeHandler(!remove)}/>
              <Body>
                <Text>Rimuovi bonus/malus</Text>
              </Body>
            </ListItem>
          </Form>
      </Popup>
    );
  }
}

export default BonusMalusPopup;
