import React from "react";
import { TextInput } from "react-native";
import { Icon, Item, ListItem, Form, Text, CheckBox, Body } from "native-base";
import Popup from "../../components/Popup";

class HealPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hp_heal: null,
      mp_heal: null,
      total_heal: false,
      half_heal: false
    };
  }

  submitFunction = () => {
    const { total_heal, half_heal, hp_heal, mp_heal } = this.state;
    this.props.submitHeal(total_heal, half_heal, hp_heal, mp_heal);
    this.resetStats();
  };

  cancelFunction = () => {
    this.resetStats();
  };

  hpHealHandler = val => {
    const newVal = val.replace(/[^0-9]/g, "");
    this.setState({ hp_heal: newVal });
  };

  mpHealHandler = val => {
    const newVal = val.replace(/[^0-9]/g, "");
    this.setState({ mp_heal: newVal });
  };

  resetStats = () => {
    this.setState({
      hp_heal: null,
      mp_heal: null,
      total_heal: false,
      half_heal: false
    });
  };

  render() {
    const { hp_heal, mp_heal, total_heal, half_heal } = this.state;
    return (
      <Popup
        isDisabled={this.props.isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        width="25%"
        title="Cura"
      >
        <Form style={{ flex: 1, borderTopColor: "#DCDCDC", borderTopWidth: 1 }}>
          <Item style={{ flex: 1 }}>
            <Icon active name="beaker" style={{ color: "red" }} />
            <TextInput
              style={{ flex: 1 }}
              disableFullscreenUI={true}
              returnKeyType="next"
              allowFontScaling={true}
              numberOfLines={1}
              placeholder="Punti Vita"
              keyboardType={"numeric"}
              value={hp_heal}
              onChangeText={this.hpHealHandler}
            />
          </Item>
          {this.props.mana && (
            <Item style={{ flex: 1 }}>
              <Icon active name="beaker" style={{ color: "#faad14" }} />
              <TextInput
                style={{ flex: 1 }}
                disableFullscreenUI={true}
                returnKeyType="done"
                allowFontScaling={true}
                numberOfLines={1}
                placeholder="Punti Mana"
                keyboardType={"numeric"}
                value={mp_heal}
                onChangeText={this.mpHealHandler}
              />
            </Item>
          )}
          <ListItem
            style={{ flex: 1 }}
            button
            onPress={() => this.setState({ total_heal: !total_heal })}
          >
            <CheckBox
              color="grey"
              checked={total_heal}
              onPress={() => this.setState({ total_heal: !total_heal })}
            />
            <Body>
              <Text>Cura tutto</Text>
            </Body>
          </ListItem>
          <ListItem
            style={{ flex: 1 }}
            button
            onPress={() => this.setState({ half_heal: !half_heal })}
          >
            <CheckBox
              color="grey"
              checked={half_heal}
              onPress={() => this.setState({ half_heal: !half_heal })}
            />
            <Body>
              <Text>Rinascita</Text>
            </Body>
          </ListItem>
        </Form>
      </Popup>
    );
  }
}

export default HealPopup;
