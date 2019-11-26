import React from "react";
import { View, TextInput } from "react-native";
import { Icon, Item, Form } from "native-base";
import Popup from "../../components/Popup";

class AddHeroStats extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      heroHp: null,
      heroMp: null,
      heroDef: null
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.workaroundFocus();
    }, 100);
  }

  workaroundFocus() {
    this.refs.hpRef.blur();

    setTimeout(() => {
      this.refs.hpRef.focus();
    }, 100);
  }

  submitFunction = () => {
    const { heroHp, heroMp, heroDef } = this.state;
    this.props.createHero(heroHp, heroMp, heroDef);
    this.resetStats();
  };

  cancelFunction = () => {
    this.resetStats();
  };

  resetStats = () => {
    this.setState({
      heroHp: null,
      heroMp: null,
      heroDef: null
    });
  };
  hpHandler = val => {
    const newVal = val.replace(/[^0-9]/g, "");
    this.setState({ heroHp: newVal });
  };
  mpHandler = val => {
    const newVal = val.replace(/[^0-9]/g, "");
    this.setState({ heroMp: newVal });
  };
  defHandler = val => {
    const newVal = val.replace(/[^0-9]/g, "");
    this.setState({ heroDef: newVal });
  };

  render() {
    let isDisabled =
      !this.state.heroHp || !this.state.heroMp || !this.state.heroDef;
    return (
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        width="25%"
        submitText="Crea"
        backText="Annulla"
        flex={3}
      >
        <Form style={{ flex: 1 }}>
          <Item style={{ flex: 1 }}>
            <Icon
              active
              name="heart"
              type="MaterialCommunityIcons"
              style={{ color: "red" }}
            />
            <TextInput
              ref="hpRef"
              disableFullscreenUI={true}
              returnKeyType="next"
              placeholder="Punti Vita"
              keyboardType={"numeric"}
              value={this.state.heroHp}
              onChangeText={this.hpHandler}
              style={{ flex: 1 }}
              onSubmitEditing={() => this.refs.mpRef.focus()}
            />
          </Item>
          <Item style={{ flex: 1 }}>
            <Icon
              active
              name="water"
              type="MaterialCommunityIcons"
              style={{ color: "yellow" }}
            />
            <TextInput
              ref="mpRef"
              disableFullscreenUI={true}
              returnKeyType="next"
              placeholder="Punti Mana"
              keyboardType={"numeric"}
              value={this.state.heroMp}
              onChangeText={this.mpHandler}
              style={{ flex: 1 }}
              onSubmitEditing={() => this.refs.defRef.focus()}
            />
          </Item>
          <Item style={{ flex: 1 }}>
            <Icon
              active
              name="shield"
              type="MaterialCommunityIcons"
              style={{ color: "black" }}
            />
            <TextInput
              ref="defRef"
              disableFullscreenUI={true}
              returnKeyType="done"
              placeholder="Difesa"
              keyboardType={"numeric"}
              value={this.state.heroDef}
              onChangeText={this.defHandler}
              style={{ flex: 1 }}
            />
          </Item>
        </Form>
      </Popup>
    );
  }
}

export default AddHeroStats;
