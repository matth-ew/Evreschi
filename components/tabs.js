class CustomTabView extends React.Component<any> {
  render() {
    const { navigation, descriptors } = this.props;
    const { routes, index } = navigation.state;
    const descriptor = descriptors[routes[index].key];
    const ActiveScreen = descriptor.getComponent();
    return (
      <SafeAreaView forceInset={{ top: 'always' }}>
        <CustomTabBar navigation={navigation} />
        <ActiveScreen navigation={descriptor.navigation} />
      </SafeAreaView>
    );
  }
}