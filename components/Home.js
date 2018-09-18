import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Constants } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class Home extends React.Component {
  render() {
    return <View style={styles.container} />;
  }
}

Home.navigationOptions = ({ navigation }) => {
  return {
    title: 'Bella Napoli',
    headerStyle: {
      backgroundColor: 'rgb(4, 159, 239)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Menu');
        }}>
        <MaterialIcons
          style={{ paddingHorizontal: 15 }}
          name="restaurant-menu"
          size={34}
          color="white"
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Carrello');
        }}>
        <Ionicons
          style={{ paddingHorizontal: 15 }}
          name="md-cart"
          size={34}
          color="white"
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
});
