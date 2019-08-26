import React from 'react';
import {TouchableOpacity} from 'react-native'
import {View,Text,Icon} from 'native-base';
import FuryPopup from './FuryPopup'

class Fury extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isVisible:false,
    }
  }

  toggleModal = (visibility) => {
    this.setState({isVisible: visibility})
  }

  render() {
    const {fp,bleeding} = this.props
    const isDisabled = (fp != 5 ? true : false)
    return(
      <View style={{
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      }}>
      {/*Punti Furia*/}
      <TouchableOpacity disabled={isDisabled} activeOpacity={0.7}
        style={[
          {alignItems:'center',width: '50%',
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: "white",
            flexDirection: 'column'},
          (!isDisabled ? {borderColor: "#00c7fa", borderWidth: 1}: {})
        ]}
        onPress={() => {this.toggleModal(!this.state.isVisible)}}>
          <View style={{width: '100%',
          height: '90%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems:'center',
          }}>
            <Icon name='water' type='MaterialCommunityIcons' style={{color:"blue"}}/>
            <Text allowFontScaling={true} numberOfLines={1}>{fp}/5</Text>
          </View>
          <View style={{
            width: '100%',
            height: '10%',
            flexDirection: 'row',
          }}>
            <View style={{
            backgroundColor: "blue",
            flex: fp}}/>
            <View style={{
            backgroundColor: "black",
            flex: 5-fp}}/>
          </View>
      </TouchableOpacity>
      {/*Sanguinamento*/}
      <View style={{
        width: (bleeding ? '50%': '0%' ),
        height: '100%',
        flexDirection: 'row',
      }}>
        {bleeding && (<Icon name='water' type='MaterialCommunityIcons' style={{color:"red"}}/>)}
      </View>
      <FuryPopup
        submitFury={this.props.submitFury}
        isVisible={this.state.isVisible}
        toggleFunction={this.toggleModal}/>
      </View>
    )
  }
}

export default Fury;
