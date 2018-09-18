import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as firebase from 'firebase';

const TINT_COLOR = 'rgb(4, 159, 239)';
const DATA_CONTAINER = 'carrello';

export default class Detail extends React.Component {
  state = {
    totale: 0,
    qta: 1,
  };

  uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  _addCarrello() {
    //const keys = this.props.navigation.state.params.item.id;
    const nome = this.props.navigation.state.params.item.name;
    const prezzo = this.props.navigation.state.params.item.price;
    const qta = this.state.qta;
    const newItem = { nome, prezzo, qta };
    const path = 'cart/'; // + this.uuidv4();

    firebase
      .database()
      .ref(path)
      .push(newItem);

    this.props.navigation.navigate('Home'); 
    //this.props.navigation.navigate('Carrello');
  }

  _conteggi(add) {
    let qta = this.state.qta;
    add ? (qta = qta + 1) : (qta = Math.max(qta - 1, 1));
    this.setState({
      totale: this.props.navigation.state.params.item.price * qta,
      qta,
    });
  }

  componentWillMount() {
    this.setState({ totale: this.props.navigation.state.params.item.price });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3 }}>
          <Image
            source={{ uri: this.props.navigation.state.params.item.image }}
            style={styles.image}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={styles.title}>
            {this.props.navigation.state.params.item.name}
          </Text>
          <Text style={styles.descrizione}>
            {this.props.navigation.state.params.item.info}
          </Text>
          <Text style={styles.prezzo}>
            {'€ ' + this.props.navigation.state.params.item.price}
          </Text>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={() => this._conteggi(false)}>
            <MaterialCommunityIcons
              style={{ paddingHorizontal: 15 }}
              name="minus-circle-outline"
              size={64}
              color={TINT_COLOR}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 36 }}>{this.state.qta}</Text>
          <TouchableOpacity onPress={() => this._conteggi(true)}>
            <MaterialCommunityIcons
              style={{ paddingHorizontal: 15 }}
              name="plus-circle-outline"
              size={64}
              color={TINT_COLOR}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => this._addCarrello()}>
            <Text style={styles.button}>
              {' '}
              {'AGGIUNGI AL CARRELLO ---> € ' + this.state.totale}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
  },
  button: {
    color: 'white',
    fontSize: 24,
  },
  button2: {
    border: 1,
    backgroundColor: TINT_COLOR,
    padding: 15,
  },
  image: {
    height: 300,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  prezzo: {
    fontSize: 28,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  descrizione: {
    fontSize: 22,
    margin: 20,
    textAlign: 'justify',
  },
});

Detail.navigationOptions = ({ navigation }) => {
  return {
    title: 'Bella Napoli - Dettaglio',
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
  };
};
