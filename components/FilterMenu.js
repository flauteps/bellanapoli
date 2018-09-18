import * as React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const TINT_COLOR = 'rgb(4, 159, 239)';

export default class FilterMenu extends React.Component {
  state = {
    data: [],
  };

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  async _loadData() {
    const dataUrl = 'http://www.dmi.unict.it/~calanducci/LAP2/food.json';

    let response = await fetch(dataUrl);
    let responseJson = await response.json();

    let listIngre = [];
    responseJson.data.forEach(item => {
      item.ingredients.forEach(ingre => {
        if (!listIngre.includes(ingre)) listIngre.push(ingre);
      });
    });

    let data = [];
    listIngre.forEach(item => {
      data.push({ text: item, select: false });
    });

    this.setState({ data });
  }

  componentDidMount() {
    this._loadData();
  }

  _keyExtract = ({ item, index }) => {
    return index;
  };

  _select(index) {
    const tmp = this.state.data;
    tmp[index].select = !tmp[index].select;
    const newData = [];
    tmp.forEach(item => {
      newData.push(item);
    });
    this.setState({ data: newData });
  }

  _reset() {
    const tmp = this.state.data;

    const newData = [];
    tmp.forEach(item => {
      item.select = false;
      newData.push(item);
    });

    this.setState({ data: newData });
  }

  _filtra() {
    const tmp = this.state.data;

    const newData = [];
    tmp.forEach(item => {
      if (item.select) newData.push(item.text);
    });

    this.props.navigation.state.params.onFilterIngr(newData);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtract}
          renderItem={({ item, index }) => (
            <TouchableHighlight onPress={() => this._select(index)}>
              <View style={styles.row}>
                {item.select ? (
                  <MaterialIcons name="check-box" size={24} />
                ) : (
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={24}
                    color={TINT_COLOR}
                  />
                )}
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
        <View style={styles.bottom}>
          <Button
            style={styles.button}
            title="     RESET     "
            onPress={() => this._reset()}
          />

          <Button
            style={styles.button}
            title="     FILTRA     "
            onPress={() => this._filtra()}
          />
        </View>
      </View>
    );
  }
}

FilterMenu.navigationOptions = ({ navigation }) => {
  return {
    title: 'Bella Napoli - Filtra menu',
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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 100,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
  },
  row: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: { flex: 1, fontSize: 18, marginLeft: 10 },
});
