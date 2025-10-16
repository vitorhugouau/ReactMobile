import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import Tab from './../../components/Tab';
import StyleAndLayout from './../../pages/ex2/StyleAndLayout';
import Calculator from '../../pages/ex3/Calculadora';
import FatherFunction from './../../pages/ex4/FatherFunction';
import List from './../../pages/ex5/List';
import Axios from './../../pages/ex6/Axios';
import Buscar from './../../pages/ex7/Buscar';
import Veiculos from './../../pages/ex8/Veiculos';
import Marvel from './../../pages/ex9/Marvel';
import NavigationScreen from './../../pages/ex10/NavigationScreen';
import NavigationHeroesScreen from './../../pages/ex11/NavigationHeroesScreen';

export default function TabLayout() {
  const [tab, setTab] = useState('');

  const getComponentByTab = () => {
    switch (tab) {
      case 'Calculadora':
        return <Calculator />;
      case 'Estilo e Layout':
        return <StyleAndLayout />;
      case 'Função Pai':
        return <FatherFunction />;
      case 'Lista':
        return <List />;
      case 'Axios':
        return <Axios />
      case 'Buscar':
        return <Buscar />
      case 'Veiculos':
        return <Veiculos />
      case 'Marvel':
        return <Marvel />
      case 'Navigation':
        return <NavigationScreen />;
      case 'HomeHerois':
        return <NavigationHeroesScreen />;
      default:
        return <StyleAndLayout />
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {getComponentByTab()}
      </View>

      <View style={styles.tabBarContainer}>
        <Tab setTab={setTab} />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
