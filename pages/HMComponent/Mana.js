import React from 'react';
import {TouchableOpacity} from 'react-native'
import {View,Text, Icon} from 'native-base';
import ManaPopup from './ManaPopup'

class Mana extends React.PureComponent {

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
    const {mp,curr_mp} = this.props
    const isDisabled = (curr_mp == 0 ? true : false)
    return(
      <View style={{
        width: '100%',
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
        <TouchableOpacity disabled={isDisabled} activeOpacity={0.7}
        style={[
          {width: '60%',
          height: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: "white",
          flexDirection: 'column',},
        (!isDisabled ? {borderColor: "#00c7fa", borderWidth: 1}: {})
        ]}
        onPress={() => {this.toggleModal(!this.state.isVisible)}}>
            <View style={{width: '100%',
            height: '90%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems:'center',
            }}>
              <Icon name='water' type='MaterialCommunityIcons' style={{color:"#faad14"}}/>
              <Text allowFontScaling={true} numberOfLines={1}>{curr_mp}/{mp}</Text>
            </View>
            <View style={{
              width: '100%',
              height: '10%',
              flexDirection: 'row',
              alignSelf: 'flex-end'
            }}>
              <View style={{
              backgroundColor: "#faad14",
              flex: curr_mp}}/>
              <View style={{
              backgroundColor: "black",
              flex: mp-curr_mp}}/>
            </View>
        </TouchableOpacity>
        <ManaPopup
          submitMana={this.props.submitMana}
          isVisible={this.state.isVisible}
          toggleFunction={this.toggleModal}
        />
      </View>
    )
  }
}

export default Mana;
