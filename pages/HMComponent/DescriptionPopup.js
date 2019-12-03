import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  Modal,
  KeyboardAvoidingView
} from "react-native";
import { View, Text } from "native-base";

import {styles} from '../../components/Styles'

class DescriptionPopup extends React.PureComponent {
  static defaultProps = {
    width: "50%",
    height: "70%",
    isDisabled: false,
    submitText: "Conferma",
    backText: "Chiudi",
    flex: 3
  };

  constructor(props) {
    super(props);
  }


  handleBackPress = () => {
    this.props.toggleFunction?.(false);
  };

  submitButton = () => {
    this.props.submitFunction?.();
    this.props.toggleFunction?.(!this.props.isVisible);
  };

  backButton = () => {
    this.props.cancelFunction?.();
    this.props.toggleFunction?.(!this.props.isVisible);
  };

  render() {
    var { width, height } = Dimensions.get("window");
    const fontSize = Math.min(Math.sqrt(0.35*width*height/this.props.description.length),25)
    if (!this.props.isVisible) {
      return <View />;
    } else
      return (
        <Modal
          visible={this.props.isVisible}
          onRequestClose={this.backButton}
          transparent={true}
          animationType="fade"
        >
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View onPress={() => this.backButton()}
              style={{
                width,
                height,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.7)"
              }}
            >
              <View onPress={() => this.backButton()}
                style={{
                  height: this.props.height,
                  width: this.props.width,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius: 10,
                  backgroundColor: "transparent"
                }}
              >
                
                {/* Title */}
                {this.props.title && <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%"
                  }}
                >
                    <Text allowFontScaling={true} maxFontSizeMultiplier={0} style={styles.descriptionPopupTitleText}>{this.props.title}</Text>
                </View>}

                {/* Content */}
                <View  style={{ flex: this.props.flex, width: "100%" }}>
                  <Text style={[styles.descriptionPopupText,{  fontSize }]}>{this.props.description}</Text>
                </View>
                <TouchableOpacity onPress={() => this.backButton()}>
                    <Text style={styles.descriptionPopupText}>{this.props.backText}</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      );
  }
}

export default DescriptionPopup;
