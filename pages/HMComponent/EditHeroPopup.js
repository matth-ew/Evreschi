import React from 'react';
import {View,TextInput} from 'react-native';
import {Icon,Item,Form} from 'native-base'
import Popup from '../../components/Popup'

class EditHeroPopup extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      heroHp: '',
      heroMp: '',
      heroDef: ''
    }
  }

  submitFunction = () => {
    const {heroHp,heroMp,heroDef} = this.state
    this.props.submitEditHero(heroHp,heroMp,heroDef);
  }

  componentDidMount() {
    this.setState({
      heroHp: this.props.heroHp,
      heroMp: this.props.heroMp,
      heroDef: this.props.heroDef
    })
    this.refs.hpRef.focus()
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
    const {heroHp,heroMp,heroDef} = this.state
    const isDisabled = (!this.state.heroHp || !this.state.heroMp || !this.state.heroDef)
    return(
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}>
        <Form style={{flex:1}}>
            <Item style={{flex:1}}>
              <Icon active name="heart" type='MaterialCommunityIcons' style={{color:"red"}} />
              <TextInput ref="hpRef" disableFullscreenUI={true} returnKeyType="next" allowFontScaling={true} numberOfLines={1} placeholder="Punti Vita" keyboardType={'numeric'} value={heroHp} onChangeText={this.hpHandler} style={{flex:1}} onSubmitEditing={() => this.refs.mpRef.focus()}/>
            </Item>
            <Item style={{flex:1}}>
              <Icon active name="water" type='MaterialCommunityIcons' style={{color:"yellow"}} />
              <TextInput ref="mpRef" disableFullscreenUI={true} returnKeyType="next" placeholder="Punti Mana" keyboardType={'numeric'} value={this.state.heroMp} onChangeText={this.mpHandler} style={{flex:1}} onSubmitEditing={() => this.refs.defRef.focus()}/>
            </Item>
            <Item style={{flex:1}}>
              <Icon active name="shield" type='MaterialCommunityIcons' style={{color:"black"}} />
              <TextInput ref="defRef" disableFullscreenUI={true} returnKeyType="done" placeholder="Difesa" keyboardType={'numeric'} value={this.state.heroDef} onChangeText={this.defHandler} style={{flex:1}}/>
            </Item>
          </Form>
      </Popup>
    );
  }
}


export default EditHeroPopup;
