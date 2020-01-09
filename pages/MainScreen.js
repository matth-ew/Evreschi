import React from 'react';
import RightBarContainer from '../components/RightBarContainer';


class MainScreen extends React.Component {
  render() {
    return (
      <RightBarContainer navigation={this.props.navigation}/>
    );
  }
}
export default MainScreen;