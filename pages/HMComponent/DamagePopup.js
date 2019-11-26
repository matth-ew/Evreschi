import React from "react";
import { TextInput } from "react-native";
import {
  Icon,
  Item,
  ListItem,
  Form,
  Text,
  CheckBox,
  Body,
  View,
  Picker
} from "native-base";
import Popup from "../../components/Popup";

class DamagePopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dice: null,
      multiplier: null,
      critical: false,
      withoutDefence: false,
      poison: false,
      burn: false,
      bleeding: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.workaroundFocus();
    }, 100);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isVisible !== this.props.isVisible)
      setTimeout(() => {
        this.workaroundFocus();
      }, 100);
  }

  workaroundFocus() {
    this.refs.diceRef.blur();

    setTimeout(() => {
      this.refs.diceRef.focus();
    }, 100);
  }

  submitFunction = () => {
    console.log(this.state);
    const {
      dice,
      multiplier,
      critical,
      withoutDefence,
      poison,
      burn,
      bleeding
    } = this.state;
    this.props.submitDamage(
      dice,
      multiplier,
      critical,
      withoutDefence,
      poison,
      burn,
      bleeding
    );
    this.resetStats();
  };

  cancelFunction = () => {
    this.resetStats();
  };

  resetStats = () => {
    this.setState({
      dice: null,
      critical: false,
      poison: false,
      burn: false,
      bleeding: false,
      withoutDefence: false
    });
  };

  itemPicker = monster_multiplier => {
    return monster_multiplier.map(val => {
      return (
        <Picker.Item
          key={"multiplier-" || val}
          label={val.toString()}
          value={val}
        />
      );
    });
  };

  diceHandler = val => {
    const newVal = val.replace(/[^0-9]/g, "");
    this.setState({ dice: newVal });
  };

  componentDidMount() {
    if (this.props.monster_multiplier) {
      this.setState({ multiplier: this.props.monster_multiplier[0] });
    }
  }

  render() {
    const {
      dice,
      multiplier,
      critical,
      withoutDefence,
      poison,
      burn,
      bleeding
    } = this.state;
    let isDisabled = dice ? false : true;
    return (
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        height={
          40 +
          (this.props.poison_burning ? 10 : 0) +
          (this.props.bleeding ? 10 : 0) +
          "%"
        }
        width="60%"
        flex={
          3 +
          (this.props.poison_burning ? 1 : 0) +
          (this.props.bleeding ? 1 : 0)
        }
      >
        <Form style={{ flex: 1 }}>
          <Item style={{ flex: 1 }}>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Icon
                active
                name="dice-multiple"
                type="MaterialCommunityIcons"
                style={{ color: "black", flex: 1 }}
              />
              <TextInput
                ref="diceRef"
                disableFullscreenUI={true}
                style={{ fontSize: 13, flex: 3 }}
                allowFontScaling={true}
                numberOfLines={1}
                placeholder="Risultato Dadi"
                keyboardType={"numeric"}
                value={dice}
                onChangeText={this.diceHandler}
              />
            </View>
            {this.props.monster_multiplier && (
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Text
                  style={{ flex: 1, fontSize: 15 }}
                  allowFontScaling={true}
                  numberOfLines={1}
                >
                  Moltiplicatore
                </Text>
                <Picker
                  key={"multiplier"}
                  selectedValue={multiplier}
                  style={{ flex: 1, width: undefined }}
                  onValueChange={itemValue =>
                    this.setState({ multiplier: itemValue })
                  }
                >
                  {this.itemPicker(this.props.monster_multiplier)}
                </Picker>
              </View>
            )}
          </Item>
          <ListItem style={{ flex: 1 }}>
            <CheckBox
              color="grey"
              checked={critical}
              onPress={() => this.setState({ critical: !critical })}
            />
            <Body>
              <Text onPress={() => this.setState({ critical: !critical })}>
                Critico
              </Text>
            </Body>
            <CheckBox
              color="grey"
              checked={withoutDefence}
              onPress={() => this.setState({ withoutDefence: !withoutDefence })}
            />
            <Body>
              <Text
                onPress={() =>
                  this.setState({ withoutDefence: !withoutDefence })
                }
              >
                Non Conta Difesa
              </Text>
            </Body>
          </ListItem>
          {(this.props.poison_burning || this.props.bleeding) && (
            <ListItem style={{ flex: 1 }} itemDivider />
          )}
          {this.props.poison_burning && (
            <ListItem style={{ flex: 1 }}>
              <CheckBox
                color="grey"
                checked={poison}
                onPress={() => this.setState({ poison: !poison })}
              />
              <Body>
                <Text onPress={() => this.setState({ poison: !poison })}>
                  Veleno
                </Text>
              </Body>
              <CheckBox
                color="grey"
                checked={burn}
                onPress={() => this.setState({ burn: !burn })}
              />
              <Body>
                <Text onPress={() => this.setState({ burn: !burn })}>
                  Ustione
                </Text>
              </Body>
            </ListItem>
          )}
          {this.props.bleeding && (
            <ListItem
              style={{ flex: 1 }}
              button
              onPress={() => this.setState({ bleeding: !bleeding })}
            >
              <CheckBox
                color="grey"
                checked={bleeding}
                onPress={() => this.setState({ bleeding: !bleeding })}
              />
              <Body>
                <Text onPress={() => this.setState({ bleeding: !bleeding })}>
                  Sanguinamento
                </Text>
              </Body>
            </ListItem>
          )}
        </Form>
      </Popup>
    );
  }
}

export default DamagePopup;
