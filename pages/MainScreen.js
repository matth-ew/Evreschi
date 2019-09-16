import React from 'react';
import LeftRightBar from '../components/LeftRightBar'

class MainScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LeftRightBar navigation={this.props.navigation}/>
    );
  }
}
export default MainScreen;
