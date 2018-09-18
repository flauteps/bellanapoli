import * as React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Row from './Row';

export default class Menu extends React.Component {
  state = {
    data: [],
    dataInit: [],
  };

  async _loadData() {
    const dataUrl = 'http://www.dmi.unict.it/~calanducci/LAP2/food.json';

    let response = await fetch(dataUrl);
    let responseJson = await response.json();
    //console.log(responseJson.data);
    this.setState({ data: responseJson.data });
    this.setState({ dataInit: responseJson.data });
  }

  _filter(text) {
    if (text == '') {
      this._loadData();
      return;
    }

    let data = this.state.dataInit;
    data = data.filter(
      item =>
        item.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        item.category.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
    this.setState({ data });
  }

  _filterIngr = text => {
    if (text.length == 0) {
      this._loadData();
      return;
    }

    let data=[];
    text.forEach(ingr => {
      let dataTmp = this.state.dataInit;
      dataTmp = dataTmp.filter(item => item.ingredients.indexOf(ingr) > -1);
      dataTmp.forEach(newItem => data.push(newItem));
    });

    this.setState({ data });
  };

  _detail(item){
       this.props.navigation.navigate('Detail', {
      item
    });
  }

  componentDidMount() {
    this._loadData();
    this.props.navigation.setParams({ onFilterIngr: this._filterIngr });
  }

  _keyExtract = ({ item, index }) => {
    return index;
  };

  _renderRow = ({ item, index }) => <Row data={item} currentIndex={index}  onDetail={() => this._detail(item)} />;

  render() {
    return (
      <View styles={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={text => this._filter(text)}
          placeholder="Cerca prodotto..."
        />

        <FlatList
          data={this.state.data}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtract}
        />
      </View>
    );
  }
}

Menu.navigationOptions = ({ navigation }) => {
  return {
    title: 'Bella Napoli - Menù',
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
          navigation.navigate('FilterMenu', {
            onFilterIngr: navigation.state.params.onFilterIngr,
          });
        }}>
        <FontAwesome
          style={{ paddingHorizontal: 15 }}
          name="filter"
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
