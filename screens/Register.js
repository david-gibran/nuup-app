import React from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, TouchableOpacity
} from 'react-native';

import ROUTES from '../constants/Routes';

const { width } = Dimensions.get('window');

export default function Register({ navigation }) {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Registrar actividad</Text>
      </View>
      <View style={styles.activityButtons}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_IRRIGATION)}>
            <View style={styles.column}>
              <Image style={styles.image} resizeMode="center" source={require('../assets/images/Riego.png')} />
              <Text style={styles.label}>Riego</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.column}>
            <Image style={styles.image} resizeMode="center" source={require('../assets/images/Aplicaciones.png')} />
            <Text style={styles.label}>Aplicaciones</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.image} resizeMode="center" source={require('../assets/images/Cosecha.png')} />
            <Text style={styles.label}>Cosecha</Text>
          </View>
          <View style={styles.column}>
            <Image style={styles.image} resizeMode="center" source={require('../assets/images/Act-huerta.png')} />
            <Text style={styles.label}>Actividades de huerta</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.IRRIGATION_LOG)}>
          <View style={styles.greenButton}>
            <Text style={styles.greenButtonText}>Ver actividades anteriores</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    backgroundColor: 'red',
    padding: 32,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  activityButtons: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  column: {
    flex: 1,
  },
  image: {
    width: width * 0.5,
    marginBottom: -30
  },
  label: {
    textAlign: 'center'
  },
  greenButton: {
    backgroundColor: '#2cb972',
    width: width * 0.9,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 32
  },
  greenButtonText: {
    color: '#f9fdfb',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 16,
  }
});
