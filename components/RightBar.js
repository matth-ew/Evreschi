import React from 'react';
import {Text,View,SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import {Button, Header, Avatar, Icon} from 'react-native-elements'

class RightBar extends React.PureComponent {
  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={{width: 55,height: '100%', alignItems:'center',justifyContent:'space-between', backgroundColor: '#666666',flexDirection: 'column'}}>
        <Icon raised
              name='compass'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-start'}}
              onPress={() => console.log("Works!")}
        />
        <Icon raised
              name='account-edit'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-end'}}
              onPress={() => console.log("Works!")}
        />
        <Icon raised
              name='close-circle'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-end'}}
              onPress={() => console.log("Works!")}
        />
      </View>
    )
  }
}

export default RightBar;
