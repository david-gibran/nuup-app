/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

import {
  StyleSheet, Text, View, SafeAreaView, Dimensions
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { Entypo, AntDesign } from '@expo/vector-icons';

import ROUTES from '../constants/Routes';

const { width } = Dimensions.get('window');

export default function Home({ navigation, route: { params } }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [params?.reset]);

  const onDelete = async (index) => {
    data.splice(index, 1);
    setData(data);
    await AsyncStorage.setItem('data', JSON.stringify(data));
    getData();
  };

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('data');
    setData(jsonValue !== null ? JSON.parse(jsonValue) : null);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Actividades realizadas</Text>
        </View>
        <DataTable style={styles.table}>
          {data?.length ? data.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{ flex: 3 }}>{item.type}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 2 }}>{format(new Date(item.date), 'd/M/yyyy')}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>
                <Entypo onPress={() => navigation.navigate(ROUTES.EDIT_IRRIGATION, { irrigation: { ...item, index } })} name="edit" size={24} color="gray" />
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>
                <AntDesign onPress={() => onDelete(index)} name="closecircle" size={24} color="gray" />
              </DataTable.Cell>
            </DataTable.Row>
          )) : (
            <Text style={styles.empty}>No hay registros</Text>
          )}
        </DataTable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  titleContainer: {
    backgroundColor: 'red',
    padding: 32,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  table: {
    marginTop: 20,
  },
  empty: {
    marginTop: 12,
    fontSize: 22,
    textAlign: 'center'
  }
});
