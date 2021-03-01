import React from 'react';
import {
  StyleSheet, View, SafeAreaView, Dimensions, Text
} from 'react-native';
import { Title } from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Title style={styles.title}>
            Caso Práctico React Native
          </Title>
          <Text style={{ fontWeight: 'bold' }}>
            {'\nDesarrollado por '}
            <Text style={{ color: '#009956' }}>
              David Espinosa.
            </Text>
          </Text>
          <Text>
            {'\nEsta aplicación es un caso práctico de desarrollo en React Native. El alcance de la aplicación es registar, actualizar y eliminar bitágoras de riego.'}
            {'\n\nEn esta versión, los datos se almacenan en la memoria del teléfono.'}
            {' Está fuera del alcance original: el menú de inicio, ayuda y perfil. Se crearon estas pantallas básicas agregando la información de contacto del desarrollador, ya que esta aplicación servirá para evaluar las habilidades del programador y así integrarse al equipo Nuup.'}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  title: {
    color: '#009956',
    textAlign: 'center',
    marginTop: 32
  },
  content: {
    margin: 32
  },
});
