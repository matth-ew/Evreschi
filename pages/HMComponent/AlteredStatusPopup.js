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
      remove: false,
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
      remove: value,
    })
  }

  resetStats = () => {
    this.setState({
      poisoning: false,
      burning: false,
      bleeding: false,
      remove: false,
    })
  }

  componentDidMount() {
    const {poisoning,burning,bleeding} = this.props
    const remove = ((poisoning&&burning&&bleeding) ? true : false)
    this.setState({
      poisoning,
      burning,
      bleeding,
      remove
    })
  }

  render() {
    const {poisoning,burning,bleeding,remove} = this.state
    return (
      <Popup
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        height="70%">
        <Form>
          <ListItem button onPress={this.resetStats}>
            <Body>
              <Text>Seleziona/Deseleziona tutto</Text>
            </Body>
            <CheckBox color="grey" checked={remove} onPress={() => this.toggleAll(!remove)}/>
          </ListItem>
          <ListItem itemDivider/>

          <ListItem button onPress={() => this.setState({poisoning:!poisoning})}>
            <Body>
              <Text>Veleno</Text>
            </Body>
            <CheckBox color="grey" checked={poisoning} onPress={() => this.setState({poisoning:!poisoning})}/>
          </ListItem>
          <ListItem button onPress={() => this.setState({burning:!burning})}>
            <Body>
              <Text>Bruciatura</Text>
            </Body>
            <CheckBox color="grey" checked={burning} onPress={() => this.setState({burning:!burning})}/>
          </ListItem>
          <ListItem button onPress={() => this.setState({bleeding:!bleeding})}>
            <Body>
              <Text>Sanguinamento</Text>
            </Body>
            <CheckBox color="grey" checked={bleeding} onPress={() => this.setState({bleeding:!bleeding})}/>
          </ListItem>
        </Form>
      </Popup>
    );
  }
}
export default AlteredStatusPopup;