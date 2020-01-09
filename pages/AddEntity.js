import React from "react";
import { View } from "react-native";
import { Button, Icon, Text, H3, Container } from "native-base";
import { Button as ElButton, Icon as ElIcon } from "react-native-elements";
import RightBarContainer from "../components/RightBarContainer";
import { styles } from "../components/Styles";

class AddEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <RightBarContainer navigation={this.props.navigation}>
            <View style={styles.overlay}>
              <H3 style={{ flex: 1, marginVertical: "5%" }}>
                Cosa vuoi aggiungere?
              </H3>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%"
                }}
              >
                <Button
                  primary
                  onPress={() => {
                    this.setState({ isVisible: false });
                    navigate("AddHero");
                  }}
                >
                  <Text>Eroe</Text>
                </Button>
                <Button
                  danger
                  onPress={() => {
                    this.setState({ isVisible: false });
                    navigate("AddMonster");
                  }}
                >
                  <Text>Mostro</Text>
                </Button>
              </View>
            </View>
          <ElButton
            icon={
              <ElIcon
                raised
                name="home"
                size={15}
                color="grey"
                type="material-icons"
              />
            }
            title="Home"
            type="clear"
            titleStyle={{ color: "white" }}
            containerStyle={{
              position: "absolute",
              bottom: 10,
              left: 10
            }}
            onPress={() => {
              navigate("Main");
            }}
          />
        </RightBarContainer>
    );
  }
}

export default AddEntity;
