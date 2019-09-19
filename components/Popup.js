import React from 'react';
import {TouchableOpacity, Dimensions,Modal } from 'react-native';
import {View,Text} from 'native-base';
import {Icon} from 'react-native-elements';
//import {styles} from './Styles'

class Popup extends React.PureComponent {

  static defaultProps = {
    width: '50%',
    height: '50%',
    isDisabled: false,
    submitText: 'Conferma',
    backText: 'Annulla',
    flex: 3,
  }

  constructor (props) {
    super(props)
  }

  handleBackPress = () => {
    this.props.toggleFunction?.(false)
  }

  submitButton = () => {
    this.props.submitFunction?.();
    this.props.toggleFunction?.(!this.props.isVisible)
  }

  backButton = () => {
    this.props.cancelFunction?.();
    this.props.toggleFunction?.(!this.props.isVisible);
  }
  render() {
    var { width, height} = Dimensions.get('window');
    if(!this.props.isVisible){
      return (<View/>)
    }
    else
      return (
        <Modal visible={this.props.isVisible} onRequestClose={this.backButton} transparent={true} animationType='fade'>
        <View style={{width,height, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={{
            height: this.props.height,
            width: this.props.width,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}>

            <View style={{flex: this.props.flex, width: '100%'}}>
              {this.props.children}
            </View>


          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%'
            }}
          >
            <TouchableOpacity disabled={this.props.isDisabled}
              onPress={() => this.submitButton()}>
              <Text style={this.props.isDisabled?{opacity: 0.3}:{}}>{this.props.submitText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.backButton()}>
              <Text>{this.props.backText}</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        </Modal>
      );
  }
}

export default Popup;
