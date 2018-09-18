import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import * as firebase from 'firebase';

import Menu from './components/Menu';
import Carrello from './components/Carrello';
import Home from './components/Home';
import FilterMenu from './components/FilterMenu';
import Detail from './components/Detail';
import Order from './components/Order';

var config = {
  apiKey: 'AIzaSyBStZP6PlG5Jr7ffoVhEiAIEEFoYGgW20Q',
  authDomain: 'bellanapoli-4e5e4.firebaseapp.com',
  databaseURL: 'https://bellanapoli-4e5e4.firebaseio.com',
  projectId: 'bellanapoli-4e5e4',
  storageBucket: 'bellanapoli-4e5e4.appspot.com',
  messagingSenderId: '839525963062',
};
!firebase.apps.length ? firebase.initializeApp(config) : null;

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Menu: {
      screen: Menu,
    },
    Carrello: {
      screen: Carrello,
    },
    FilterMenu: {
      screen: FilterMenu,
    },
    Detail: {
      screen: Detail,
    },
    Order: {
      screen: Order,
    },
  },
  {
    initialRouteName: 'Home',
    //mode: 'modal',
  }
);

export default App;
