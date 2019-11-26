import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { View, Text, Icon } from "native-base";
import FuryPopup from "./FuryPopup";
import { fury, blood, plus, minus } from "../../assets";

class Fury extends React.PureComponent {
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
    const { fp, max_fp, bleeding } = this.props;
    const isDisabled = fp != max_fp ? true : false;
    return (
      <React.Fragment>
        {/*Punti Furia*/}
        <TouchableOpacity
          disabled={isDisabled}
          activeOpacity={0.7}
          style={[
            {
              alignItems: "center",
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
            },
            !isDisabled ? { borderColor: "#00c7fa", borderWidth: 1 } : {}
          ]}
          onPress={() => {
            this.toggleModal(!this.state.isVisible);
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
            <View>
              <Image style={{ height: "100%", aspectRatio: 1 }} source={fury} />
            </View>
            <Text allowFontScaling={true} numberOfLines={1}>
              {fp}/{max_fp}
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
                backgroundColor: "#3385ff",
                flex: fp
              }}
            />
            <View
              style={{
                backgroundColor: "black",
                flex: max_fp - fp
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "30%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
        <TouchableOpacity style={{ flex: 1, marginLeft: "5%" }}
              onPress={() => {
                this.props.handleFury?.(-1);
              }}>
              <View
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
                  source={minus}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, marginLeft: "5%" }}
              onPress={() => {
                this.props.handleFury?.(+1);
              }}>
              <View
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
                  source={plus}
                />
              </View>
            </TouchableOpacity>
            </View>
        {/*Sanguinamento*/}
        <View
          style={{
            width: "20%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
          {bleeding && (
            <View style={{ flex: 1, marginLeft: "5%" }}>
              <View
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
                  source={blood}
                />
              </View>
            </View>
          )}
        </View>
        <FuryPopup
          submitFury={this.props.submitFury}
          isVisible={this.state.isVisible}
          toggleFunction={this.toggleModal}
        />
      </React.Fragment>
    );
  }
}

export default Fury;
