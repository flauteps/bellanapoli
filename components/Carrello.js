import * as React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,BackHandler
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';

const DATA_CONTAINER = 'carrello';
const TINT_COLOR = 'rgb(4, 159, 239)';

export default class Carrello extends React.Component {
  state = {
    data: [],
    totale: 0,
  };

  _loadData() {
   // console.log('_loadData');
    let data = [];

    const path = 'cart/';

    firebase
      .database()
      .ref(path)
      .on('value', snap =>
        snap.forEach(child => {
          data.push({
            key: child.key,
            ...child.val(),
            nome: child.val().nome,
          });
        })
      );
    //console.log(data)

    let totale = 0;
    data.forEach(item => {
      totale += item.qta * item.prezzo;
    });
   
    this.setState({ totale });
    this.setState({ data });
  }

  _remove(item) {
    const path = 'cart/' + item.key;

    firebase
      .database()
      .ref(path)
      .remove();

    this._loadData();
  }

  componentDidMount() {
    console.log('did')
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this._loadData();
  }

  componentWillMount() {
    console.log('will');
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

 handleBackPress = () => {
    console.log('back');
    this.goBack(); // works best when the goBack is async
    return true;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.data.map(l => (
            <Swipeout
              style={{ backgroundColor: 'white' }}
              autoClose
              onClose={() => this._remove(l)}
              right={[{ type: 'delete', text: 'Rimuovi' }]}>
              <ListItem
                roundAvatar
                key={l.nome}
                title={
                  <View>
                    <Text style={styles.testo}>{l.nome}</Text>
                  </View>
                }
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>
                      {l.qta} x {l.prezzo}€
                    </Text>
                    <Text style={styles.testoTotale}>{l.qta * l.prezzo}€</Text>
                  </View>
                }
              />
            </Swipeout>
          ))}
        </List>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => this.props.navigation.navigate('Order')}>
            <Text style={styles.button}>
              VAI AL PAGAMENTO ---> €{this.state.totale}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  testoTotale: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  testo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitleView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingText: {
    paddingLeft: 10,
    fontSize: 22,
  },
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
});

Carrello.navigationOptions = ({ navigation }) => {
  return {
    title: 'Bella Napoli - Carrello',
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
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <MaterialIcons
          style={{ paddingHorizontal: 15 }}
          name="home"
          size={34}
          color="white"
        />
      </TouchableOpacity>
    ),
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
  };
};
