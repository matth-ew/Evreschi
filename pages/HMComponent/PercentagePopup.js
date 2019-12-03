import React from "react";
import { TextInput, Image } from "react-native";
import { View, Text, H3, Icon, Item } from "native-base";
import Popup from "../../components/Popup";
import { percentage } from "../../assets";

class PercentagePopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      percentage: null
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.workaroundFocus();
    }, 100);
  }

  workaroundFocus() {
    this.refs.percentageRef.blur();

    setTimeout(() => {
      this.refs.percentageRef.focus();
    }, 100);
  }

  submitFunction = () => {
    this.props.submitPercentage(this.state.percentage);
    this.resetStats();
  };

  cancelFunction = () => {
    this.resetStats();
  };

  percentageHandler = val => {
    const newVal = val.replace(/[^0-9]/g, "");
    this.setState({ percentage: newVal });
  };

  resetStats = () => {
    this.setState({
      percentage: null
    });
  };

  render() {
    const isDisabled = this.state.percentage ? false : true;
    return (
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        height="30%"
        width="40%"
        flex={2}
        title="Subisci Danno Percentuale"
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Item style={{ flex: 1 }}>
          <View
                style={{
                  height: "100%",
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
            <Image
              style={{ height: "50%", aspectRatio: 1 }}
              source={percentage}
            />
            </View>
            <TextInput
              ref="percentageRef"
              disableFullscreenUI={true}
              allowFontScaling={true}
              numberOfLines={1}
              placeholder="Danno Percentuale"
              keyboardType={"numeric"}
              value={this.state.percentage}
              onChangeText={this.percentageHandler}
            />
          </Item>
        </View>
      </Popup>
    );
  }
}

export default PercentagePopup;
