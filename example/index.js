import * as React from "react";
import { ScrollView, StatusBar, StyleSheet, View, Text } from "react-native";
import { withRadialActionMenu } from "react-native-radial-context-menu";

const TouchableWithMenu = withRadialActionMenu(props => (
  <View {...props} style={[styles.box, { backgroundColor: "#7e7e7e" }]} />
));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableScroll: false,
    };
  }

  handleOpen = () => {
    this.setState({ disableScroll: true });
  };

  handleClose = (value) => {
    this.setState({ disableScroll: false });

    console.log(value);
  };

  render() {
    const { disableScroll } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <ScrollView scrollEnabled={!disableScroll}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <TouchableWithMenu
            buttons={[
              { component: () => <Text>1</Text>, value: 1 },
              { component: () => <Text>2</Text>, value: 2 },
              { component: () => <Text>3</Text>, value: 3 },
              { component: () => <Text>4</Text>, value: 4 },
            ]}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            openDelay={500}
          />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </ScrollView>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#d3d3d3",
    height: 100,
    margin: 10,
    zIndex: -1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
