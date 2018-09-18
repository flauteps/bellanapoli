import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const TINT_COLOR = 'rgb(4, 159, 239)';

export default class Row extends React.Component {
   
  render() {
    return (
      <TouchableHighlight onPress={this.props.onDetail}>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>{this.props.data.name}</Text>
            <Text style={styles.descrizione}>{this.props.data.info}</Text>
            <Text style={styles.title}>{'€ ' + this.props.data.price}</Text>
          </View>
          <View>
            <Image
              source={{ uri: this.props.data.image }}
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
                height: 200,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  descrizione: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: 'gray',
    textAlign: 'justify',
  },
});
