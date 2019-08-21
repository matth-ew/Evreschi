import React from 'react';
import {Text,View,SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import {Button, Header, Avatar, Icon} from 'react-native-elements'


class RightBar extends React.PureComponent {

  handleEdit = () => {
    // Need to check to prevent null exception.
    this.props.editFunction?.(); // Same as this.props.onPress && this.props.onPress();
  }
  handleDelete = () => {
    // Need to check to prevent null exception.
    this.props.deleteFunction?.(); // Same as this.props.onPress && this.props.onPress();
  }

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
        {this.props.editFunction && (
          <Icon raised
              name='account-edit'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-end'}}
              onPress={() => this.handleEdit()}
        />)}
        {this.props.cancelFunction && (
          <Icon raised
              name='close-circle'
              color='grey'
              type='material-community'
              iconStyle={{fontSize:35}}
              style={{alignSelf:'flex-end'}}
              onPress={() => this.handleDelete()}
        />)}
      </View>
    )
  }
}

export default RightBar;
