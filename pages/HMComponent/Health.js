import React from 'react';
import {Icon,View,Text} from 'native-base';


class Health extends React.PureComponent {

  render() {
    const {hp,curr_hp, poisoning, burning} = this.props
    return(
      <View style={{
        width: '100%',
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
      }}>
        <View style={{
          width: '60%',
          height: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: "white",
          flexDirection: 'column',
        }}>
          <View style={{width: '100%',
          height: '90%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems:'center',
          }}>
            <Icon name='heart' type='MaterialCommunityIcons' style={{color:"red"}}/>
            <Text allowFontScaling={true} numberOfLines={1}>{curr_hp}/{hp}</Text>
          </View>
          <View style={{
            width: '100%',
            height: '10%',
            flexDirection: 'row',
          }}>
            <View style={{
            backgroundColor: "red",
            flex: curr_hp}}/>
            <View style={{
            backgroundColor: "black",
            flex: hp-curr_hp}}/>
          </View>
        </View>
        <View style={{
          width: '40%',
          height: '100%',
          flexDirection: "row"
        }}>
          {poisoning && (<Icon name='water' type='MaterialCommunityIcons' style={{color:"green"}}/>)}
          {burning && (<Icon name='fire' type='MaterialCommunityIcons' style={{color:"red"}}/>)}
        </View>
      </View>
    )
  }
}

export default Health;
