import React from 'react';
import {
  StyleSheet, TouchableOpacity, SafeAreaView, Linking
} from 'react-native';
import { Card } from 'react-native-paper';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => Linking.openURL('https://drive.google.com/file/d/1rpr-ipjOkpTAyNArDeqkLIu5gAv578th/view?usp=sharing')}>
        <Card>
          <Card.Title title="David Gibrán Espinosa Urrutia" subtitle="Currículum Vitae" />
        </Card>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
