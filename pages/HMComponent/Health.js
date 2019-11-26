import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Icon, Text } from "native-base";
import { poison, fire, percentage } from "../../assets";
import PercentagePopup from "./PercentagePopup";
import PoisonPopup from "./PoisonPopup";
import BurningPopup from "./BurningPopup";

class Health extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPoisonVisible: false,
      isBurningVisible: false,
      isPercentageVisible: false,
    };
  }

  togglePercentageModal = visibility => {
    this.setState({ isPercentageVisible: visibility });
  };
  togglePoisonModal = visibility => {
    this.setState({ isPoisonVisible: visibility });
  };
  toggleBurningModal = visibility => {
    this.setState({ isBurningVisible: visibility });
  };

  render() {
    const { hp, curr_hp, poisoning, burning, submitPercentDamage } = this.props;
    return (
      <React.Fragment>
        <View
          style={{
            width: "60%",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 5,
            overflow: "hidden",
            flexDirection: "column"
          }}
        >
          <View
            style={{
              width: "100%",
              height: "90%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Icon
              name="heart"
              type="MaterialCommunityIcons"
              style={{ color: "red" }}
            />
            <Text allowFontScaling={true} numberOfLines={1}>
              {curr_hp}/{hp}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "10%",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                flex: curr_hp
              }}
            />
            <View
              style={{
                backgroundColor: "black",
                flex: hp - curr_hp
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "40%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
          {submitPercentDamage && (
            <View style={{ flex: 1, marginLeft: "5%" }}>
              <TouchableOpacity
                onPress={() => {
                  this.togglePercentageModal(!this.state.isPercentageVisible);
                }}
                style={{
                  backgroundColor: "white",
                  height: "100%",
                  aspectRatio: 1,
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ height: "60%", aspectRatio: 1 }}
                  source={percentage}
                />
              </TouchableOpacity>
              {this.state.isPercentageVisible && (
              <PercentagePopup
                submitPercentage={this.props.submitPercentDamage}
                isVisible={this.state.isPercentageVisible}
                toggleFunction={this.togglePercentageModal}
              />)}
            </View>
          )}
          {poisoning && (
            <View style={{ flex: 1, marginLeft: "5%" }}>
              <TouchableOpacity
                onPress={() => {
                  this.togglePoisonModal(!this.state.isPoisonVisible);
                }}
                style={{
                  backgroundColor: "white",
                  height: "100%",
                  aspectRatio: 1,
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ height: "60%", aspectRatio: 1 }}
                  source={poison}
                />
              </TouchableOpacity>

              <PoisonPopup
                submitPoison={this.props.submitPoison}
                isVisible={this.state.isPoisonVisible}
                toggleFunction={this.togglePoisonModal}
              />
            </View>
          )}
          {burning && (
            <View style={{ flex: 1, marginLeft: "5%" }}>
              <TouchableOpacity
                onPress={() => {
                  this.toggleBurningModal(!this.state.isBurningVisible);
                }}
                style={{
                  backgroundColor: "white",
                  height: "100%",
                  aspectRatio: 1,
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ height: "60%", aspectRatio: 1 }}
                  source={fire}
                />
              </TouchableOpacity>
              <BurningPopup
                submitBurning={this.props.submitBurning}
                isVisible={this.state.isBurningVisible}
                toggleFunction={this.toggleBurningModal}
              />
            </View>
          )}
        </View>
      </React.Fragment>
    );
  }
}

export default Health;
