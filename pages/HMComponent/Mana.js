import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { View, Text, Icon } from "native-base";
import ManaPopup from "./ManaPopup";
import { magicWand } from "../../assets";

class Mana extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  toggleModal = visibility => {
    this.setState({ isVisible: visibility });
  };

  render() {
    const { mp, curr_mp } = this.props;
    const isDisabled = curr_mp == 0 ? true : false;
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
              name="water"
              type="MaterialCommunityIcons"
              style={{ color: "#faad14" }}
            />
            <Text allowFontScaling={true} numberOfLines={1}>
              {curr_mp}/{mp}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "10%",
              flexDirection: "row",
              alignSelf: "flex-end"
            }}
          >
            <View
              style={{
                backgroundColor: "#faad14",
                flex: curr_mp
              }}
            />
            <View
              style={{
                backgroundColor: "black",
                flex: mp - curr_mp
              }}
            />
          </View>
        </View>
        {/*Cast di magie*/}
        <View
          style={{
            width: "40%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
          <View style={{ flex: 1, marginLeft: "5%" }}>
            <TouchableOpacity
              disabled={isDisabled}
              style={[
                {
                  backgroundColor: "white",
                  height: "100%",
                  aspectRatio: 1,
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center"
                },
                !isDisabled
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "grey" }
              ]}
              onPress={() => {
                this.toggleModal(!this.state.isVisible);
              }}
            >
              <Image
                style={{ height: "60%", aspectRatio: 1 }}
                source={magicWand}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isVisible && (
        <ManaPopup
          submitMana={this.props.submitMana}
          isVisible={this.state.isVisible}
          toggleFunction={this.toggleModal}
        />)}
      </React.Fragment>
    );
  }
}

export default Mana;
