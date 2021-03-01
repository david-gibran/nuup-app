import React from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, Linking
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Headline } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 

export default function Help() {
  return (
    <SafeAreaView style={styles.container}>

      <Ionicons style={[styles.mainIcon]} name="person" size={80} color="black" />
      <Headline style={{ textAlign: 'center' }}>Contacto</Headline>

      <View style={styles.subContainer}>
        <View style={styles.element}>
          <MaterialCommunityIcons style={styles.icon} name="phone" size={24} />
          <Text style={styles.tel} onPress={() => Linking.openURL('tel:+5618411807')}>56 1841 1807</Text>
        </View>
        <View style={styles.element}>
          <MaterialCommunityIcons style={styles.icon} name="whatsapp" size={24} />
          <Text style={styles.whats} onPress={() => Linking.openURL('whatsapp://send?text=&phone=525618411807')}>56 1841 1807</Text>
        </View>
        <View style={styles.element}>
          <MaterialCommunityIcons style={styles.icon} name="email-outline" size={24} />
          <Text style={styles.email} onPress={() => Linking.openURL('mailto:david.gibran@gmail.com')}>david.gibran@gmail.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center'
  },
  mainIcon: {
    alignSelf: 'center',
    marginTop: 32,
  },
  icon: {
    marginRight: 10,
  },
  element: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    marginLeft: 32,
  },
  subContainer: {
    borderColor: '#c0c0c0',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 32,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 36,
    paddingHorizontal: 18,
    justifyContent: 'center',
    textAlign: 'center'
  },
});
