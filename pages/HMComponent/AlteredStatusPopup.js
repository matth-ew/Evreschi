import React from 'react';
import {View,Text,Icon,Form,Item,ListItem,CheckBox,Body} from 'native-base';
import Popup from '../../components/Popup'

class AlteredStatusPopup extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      poisoning: false,
      burning: false,
      bleeding: false,
    }
  }


  submitFunction = () => {
    console.log(this.state)
    const {poisoning,burning,bleeding} = this.state
    this.props.submitAltered(poisoning,burning,bleeding);
    this.resetStats();
  }

  toggleAll = (value) => {
    this.setState({
      poisoning: value,
      burning: value,
      bleeding: value,
    })
  }

  resetStats = () => {
    this.setState({
      poisoning: false,
      burning: false,
      bleeding: false,
    })
  }

  componentDidMount() {
    const {poisoning,burning,bleeding} = this.props
    this.setState({
      poisoning,
      burning,
      bleeding
    })
  }


  render() {
    const {poisoning,burning,bleeding} = this.state
    const remove = (this.props.bleeding != undefined ? (poisoning||burning||bleeding) : (poisoning||burning))
    return (
      <Popup
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        height={50 +
        (this.props.bleeding!= undefined ? 10 : 0) +
        "%"}
         flex={4}
        title="Status Alterati">
        <Form style={{ flex: 1, borderTopColor: "#DCDCDC", borderTopWidth: 1 }}>
          <ListItem button onPress={() => this.toggleAll(!remove)} style={{flex:1}}>
            <Body>
              <Text>Seleziona/Deseleziona tutto</Text>
            </Body>
            <CheckBox color="grey" checked={remove} onPress={() => this.toggleAll(!remove)}/>
          </ListItem>
          <ListItem style={{flex:1}} itemDivider/>

          <ListItem style={{flex:1}} button onPress={() => this.setState({poisoning:!poisoning})}>
            <Body>
              <Text>Veleno</Text>
            </Body>
            <CheckBox color="grey" checked={poisoning} onPress={() => this.setState({poisoning:!poisoning})}/>
          </ListItem>
          <ListItem style={{flex:1}} button onPress={() => this.setState({burning:!burning})}>
            <Body>
              <Text>Ustione</Text>
            </Body>
            <CheckBox color="grey" checked={burning} onPress={() => this.setState({burning:!burning})}/>
          </ListItem>
          {this.props.bleeding != undefined && (
            <ListItem style={{flex:1}} button onPress={() => this.setState({bleeding:!bleeding})}>
              <Body>
                <Text>Sanguinamento</Text>
              </Body>
              <CheckBox color="grey" checked={bleeding} onPress={() => this.setState({bleeding:!bleeding})}/>
            </ListItem>
          )}
        </Form>
      </Popup>
    );
  }
}
export default AlteredStatusPopup;
