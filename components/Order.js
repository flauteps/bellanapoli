import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Location, Permissions } from 'expo';
import { Button } from 'react-native-elements';

const TINT_COLOR = 'rgb(4, 159, 239)';

export default class Order extends React.Component {
  state = {
    indirizzo: '',
    telefono: '',
    cliente: '',
    isLoading: false,
    isSending: false,
  };

  _getIndirizzo = async () => {
    this.setState({ isLoading: true });

    try {
      const locationServicesEnabled = await Location.getProviderStatusAsync();
      //console.log(locationServicesEnabled)
      const status = await Permissions.askAsync(Permissions.LOCATION);
      //console.log(status)
      if (status.status === 'granted' && locationServicesEnabled) {
        var options = {
          enableHighAccuracy: false,
          timeout: 5000,
        };

        //console.log('get indirizzo 1');
        await navigator.geolocation.getCurrentPosition(
          position => {
            /*console.log(
          'get indirizzo 2 - ' +
            position.coords.latitude +
            ' ' +
            position.coords.longitude
        );*/
            const lat_long = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            //console.log(lat_long);
            Location.reverseGeocodeAsync(lat_long).then(resp => {
              console.log(resp);
              this.setState({
                indirizzo:
                  resp[0].street +
                  ' - ' +
                  resp[0].postalCode +
                  '  ' +
                  resp[0].city,
              });
              // console.log(this.state.indirizzo);
            });
          },
          error => {
            alert(error);
          },
          options
        );
      } else {
        throw new Error('Location permission not granted');
      }
    } catch (err) {
      alert(err);
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 10,
          }}
          placeholder="Nome e Cognome"
          value={this.state.cliente}
          onChangeText={text => this.setState({ cliente: text })}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 10,
          }}
          placeholder="Telefono"
          keyboardType="phone-pad"
          value={this.state.telefono}
          onChangeText={text => this.setState({ telefono: text })}
        />
        <View style={styles.container2}>
          <TextInput
            style={{
              flex: 2,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginLeft: 10,
              padding: 10,
            }}
            placeholder="Indirizzo di consegna"
            value={this.state.indirizzo}
            onChangeText={text => this.setState({ indirizzo: text })}
          />
          <Button
            loading={this.state.isLoading}
            buttonStyle={{ backgroundColor: TINT_COLOR }}
            icon={{ name: 'home', type: 'font-awesome', color: 'white' }}
            title="INDIRIZZO"
            onPress={this._getIndirizzo}
          />
        </View>
        <View style={styles.container3}>
          <Button
            large
            loading={this.state.isSending}
            buttonStyle={{ backgroundColor: TINT_COLOR }}
            icon={{ name: 'send', type: 'font-awesome', color: 'white' }}
            title="INVIA ORDINE"
            onPress={this._getIndirizzo}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container3: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Order.navigationOptions = ({ navigation }) => {
  return {
    title: 'Bella Napoli - Order',
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
