import React from 'react';
import {View} from 'react-native';
import {Icon,Input,Item,Form} from 'native-base'
import Popup from '../../components/Popup'

class AddHeroStats extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      heroHp: null,
      heroMp: null,
      heroDef: null
    }
  }

  submitFunction = () => {
    const {heroHp,heroMp,heroDef} = this.state
    this.props.createHero(heroHp,heroMp,heroDef);
    this.resetStats();
  }

  cancelFunction = () => {
    this.resetStats();
  }

  resetStats = () => {
    this.setState({
      heroHp: null,
      heroMp: null,
      heroDef: null
    })
  }
  hpHandler = (val) => {
    const newVal =val.replace(/[^0-9]/g, "");
    this.setState({heroHp:newVal})
  }
  mpHandler = (val) => {
    const newVal =val.replace(/[^0-9]/g, "");
    this.setState({heroMp:newVal})
  }
  defHandler = (val) => {
    const newVal =val.replace(/[^0-9]/g, "");
    this.setState({heroDef:newVal})
  }

  render() {
    let isDisabled = (!this.state.heroHp || !this.state.heroMp || !this.state.heroDef)
    return(
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        submitText="Crea" backText="Annulla" flex={3}>
        <Form style={{flex:1}}>
            <Item style={{flex:1}}>
              <Icon active name="heart" type='MaterialCommunityIcons' style={{color:"red"}} />
              <Input placeholder="Punti Vita" keyboardType={'numeric'} value={this.state.heroHp} onChangeText={this.hpHandler}/>
            </Item>
            <Item style={{flex:1}}>
              <Icon active name="water" type='MaterialCommunityIcons' style={{color:"yellow"}} />
              <Input placeholder="Punti Mana" keyboardType={'numeric'} value={this.state.heroMp} onChangeText={this.mpHandler}/>
            </Item>
            <Item style={{flex:1}}>
              <Icon active name="shield" type='MaterialCommunityIcons' style={{color:"black"}} />
              <Input placeholder="Difesa" keyboardType={'numeric'} value={this.state.heroDef} onChangeText={this.defHandler}/>
            </Item>
          </Form>
      </Popup>
    );
  }
}


export default AddHeroStats;
