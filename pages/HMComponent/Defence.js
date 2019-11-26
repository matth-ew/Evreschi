import React from 'react';
import {View,Text, Icon} from 'native-base';


class Defence extends React.PureComponent {
  render() {
    const {curr_def,def} = this.props
    return(
      <React.Fragment>
        {/*Difesa*/}
          <View style={{
            flex: 6,
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 5,
            overflow: "hidden",
            flexDirection: 'column',
          }}>
            <View style={{width: '100%',
            height: '90%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems:'center',
            }}>
              <Icon name='shield' type='MaterialCommunityIcons' style={{color:"black"}}/>
            {/*Caso Difesa senza bonus/malus*/}
              {curr_def==def && (
                <Text>{def}</Text>
              )}
            {/*Caso Difesa con bonus*/}
              {curr_def>def && (
                <View style={{flexDirection: "row"}}>
                  <Text style={{color: "gray",textDecorationLine: 'line-through'}}>{def}</Text>
                  <Text style={{color: "green",fontWeight:'bold'}}> {curr_def}</Text>
                </View>
              )}
            {/*Caso Difesa con malus*/}
              {curr_def<def && (
                <View style={{flexDirection: "row"}}>
                  <Text style={{color: "gray",textDecorationLine: 'line-through'}}>{def}</Text>
                  <Text style={{color: "red",fontWeight:'bold'}}> {curr_def}</Text>
                </View>
              )}
            </View>
          </View>
        {/*Malus*/}
          <View style={{
            flex: 4,
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
          }}>

          </View>
      </React.Fragment>
    )
  }
}

export default Defence;
