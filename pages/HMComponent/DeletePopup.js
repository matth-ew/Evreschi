import React from 'react';
import {CheckBox, Body, Text, ListItem , Form} from 'native-base';
import Popup from '../../components/Popup'

class DeletePopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      killThisEntity: true,
      deleteThisEntity: false,
    };
  }

  submitFunction = () => {
    this.props.submitFunction(this.state);
  };

  componentDidMount(){
    if(this.props.curr_hp == 0){
      this.setState({killThisEntity: false, deleteThisEntity: true})
    }
  }


  render() {
    const label = this.props.hero ? "Eroe" : "Animale"
    const disabled = (this.props.curr_hp == 0)
    const {killThisEntity, deleteThisEntity} = this.state
    return (
      <Popup
        isDisabled={this.props.isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        height="30%" width="40%"
        title={"Gestione  " + label}
        flex={2}>
        <Form style={{ flex: 1, borderTopColor: "#DCDCDC", borderTopWidth: 1 }}>
        <ListItem style={[{flex:1,alignItems: "center", justifyContent: "center"}]}>
          <CheckBox
            disabled={disabled}
            color={(disabled ? "#DCDCDC" : "grey")}
            checked={killThisEntity}
            onPress={() => this.setState({ killThisEntity: !killThisEntity, deleteThisEntity: false})}
          />
          <Body>
            <Text
              allowFontScaling={true} numberOfLines={1}
              style={(disabled ? {color: "#DCDCDC"} : {})}
              onPress={() =>
                ( !disabled ? this.setState({ killThisEntity: !killThisEntity, deleteThisEntity: false}) : {})
              }
            >
              Uccidi Questo {label}
            </Text>
          </Body>
          </ListItem>
          <ListItem style={{flex:1,alignItems: "center", justifyContent: "center"}}>
          <CheckBox
            color="grey"
            checked={deleteThisEntity}
            onPress={() => this.setState({ killThisEntity: false, deleteThisEntity: !deleteThisEntity})}
          />
          <Body>
            <Text
              allowFontScaling={true} numberOfLines={1}
              onPress={() =>
                this.setState({ killThisEntity: false, deleteThisEntity: !deleteThisEntity})
              }
            >
              Cancella questo {label}
            </Text>
          </Body>
          </ListItem>
        </Form>
      </Popup>
    );
  }
}

export default DeletePopup;
