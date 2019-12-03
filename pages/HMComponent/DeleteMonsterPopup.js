import React from "react";
import {CheckBox, Body, Text, ListItem , Form} from "native-base";
import Popup from "../../components/Popup";

class DeleteMonsterPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      killThisMonster: true,
      killAllMonsters: false,
      deleteThisMonster: false,
      deleteAllDead: false
    };
  }
  submitFunction = () => {
    this.props.submitFunction(this.state);
  };

  componentDidMount(){
    if(this.props.curr_hp == 0){
      this.setState({killThisMonster: false, killAllMonsters: false, deleteThisMonster: true, deleteAllDead: false })
    }
  }

  render() {
    const {killThisMonster,killAllMonsters,deleteThisMonster,deleteAllDead} = this.state;
    const disabled = (this.props.curr_hp == 0)
    return (
      <Popup
        isDisabled={this.props.isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        flex={4}
        title="Gestione Mostro"
      >
        <Form style={{ flex: 1, borderTopColor: "#DCDCDC", borderTopWidth: 1 }}>
          <ListItem style={[{flex:1,alignItems: "center", justifyContent: "center"}]}>
          <CheckBox
            disabled={disabled}
            color={(disabled ? "#DCDCDC" : "grey")}
            checked={killThisMonster}
            onPress={() => this.setState({ killThisMonster: !killThisMonster, killAllMonsters: false, deleteThisMonster: false, deleteAllDead: false })}
          />
          <Body>
            <Text
              allowFontScaling={true} numberOfLines={1}
              style={(disabled ? {color: "#DCDCDC"} : {})}
              onPress={() =>
                ( !disabled ? this.setState({ killThisMonster: !killThisMonster, killAllMonsters: false, deleteThisMonster: false, deleteAllDead: false }) : {})
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
            allowFontScaling={true} numberOfLines={1}
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
            allowFontScaling={true} numberOfLines={1}
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
            allowFontScaling={true} numberOfLines={1}
              onPress={() =>
                this.setState({ deleteThisMonster: !deleteThisMonster, killThisMonster: false, killAllMonsters: false, deleteAllDead: false })
              }
            >
              Cancella questo mostro
            </Text>
          </Body>
          </ListItem>
          </Form>
      </Popup>
    );
  }
}

export default DeleteMonsterPopup;
