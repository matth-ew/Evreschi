import React from "react";
import { View, H3, CheckBox, Body, Text, ListItem } from "native-base";
import Popup from "../../components/Popup";

class DeleteMonsterPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      killThisMonster: false,
      killAllMonsters: false,
      deleteThisMonster: true,
      deleteAllDead: false
    };
  }
  submitFunction = () => {
    this.props.submitFunction(this.state);
  };

  render() {
    const {killThisMonster,killAllMonsters,deleteThisMonster,deleteAllDead} = this.state;
    return (
      <Popup
        isDisabled={this.props.isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        height="60%"
        width="40%"
        flex={5}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <H3>Cosa vuoi fare?</H3>
        </View>
          <ListItem style={{flex:1,alignItems: "center", justifyContent: "center"}}>
          <CheckBox
            color="grey"
            checked={killThisMonster}
            onPress={() => this.setState({ killThisMonster: !killThisMonster, killAllMonsters: false, deleteThisMonster: false, deleteAllDead: false })}
          />
          <Body>
            <Text
              onPress={() =>
                this.setState({ killThisMonster: !killThisMonster, killAllMonsters: false, deleteThisMonster: false, deleteAllDead: false })
              }
            >
              Uccidi Questo Mostro
            </Text>
          </Body>
          </ListItem>
          <ListItem style={{flex:1,alignItems: "center", justifyContent: "center"}}>
          <CheckBox
            color="grey"
            checked={killAllMonsters}
            onPress={() => this.setState({ killAllMonsters: !killAllMonsters, killThisMonster: false, deleteThisMonster: false, deleteAllDead: false })}
          />
          <Body>
            <Text
              onPress={() =>
                this.setState({ killAllMonsters: !killAllMonsters, killThisMonster: false, deleteThisMonster: false, deleteAllDead: false })
              }
            >
              Uccidi tutti i mostri
            </Text>
          </Body>
          </ListItem>
          <ListItem style={{flex:1,alignItems: "center", justifyContent: "center"}}>
          <CheckBox
            color="grey"
            checked={deleteAllDead}
            onPress={() => this.setState({ deleteAllDead: !deleteAllDead, killThisMonster: false, killAllMonsters: false, deleteThisMonster: false })}
          />
          <Body>
            <Text
              onPress={() =>
                this.setState({ deleteAllDead: !deleteAllDead, killThisMonster: false, killAllMonsters: false, deleteThisMonster: false })
              }
            >
              Cancella tutti i mostri morti
            </Text>
          </Body>
          </ListItem>
          <ListItem style={{flex:1,alignItems: "center", justifyContent: "center"}}>
          <CheckBox
            color="grey"
            checked={deleteThisMonster}
            onPress={() => this.setState({ deleteThisMonster: !deleteThisMonster, killThisMonster: false, killAllMonsters: false, deleteAllDead: false })}
          />
          <Body>
            <Text
              onPress={() =>
                this.setState({ deleteThisMonster: !deleteThisMonster, killThisMonster: false, killAllMonsters: false, deleteAllDead: false })
              }
            >
              Cancella questo mostro
            </Text>
          </Body>
          </ListItem>
      </Popup>
    );
  }
}

export default DeleteMonsterPopup;
