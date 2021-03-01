import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet, Text, View, SafeAreaView, Dimensions, Platform, Image
} from 'react-native';
import {
  Divider, TextInput, IconButton, Portal, Modal, Button, Dialog, Paragraph
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ROUTES from '../constants/Routes';

const { width } = Dimensions.get('window');

export default function EditIrrigation({ navigation, route: { params } }) {
  const [showDate, setShowDate] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const {
    register, watch, setValue, reset, handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      date: new Date(),
      sector: '',
      variety: '',
      surface: '',
      irrigationTime: '',
      responsible: '',
      personInCharge: '',
    }
  });

  useEffect(() => {
    register({ name: 'date' }, { required: true });
    register({ name: 'sector' }, { required: true });
    register({ name: 'variety' });
    register({ name: 'surface' });
    register({ name: 'irrigationTime' }, { required: true });
    register({ name: 'responsible' }, { required: true });
    register({ name: 'personInCharge' }, { required: true });
  }, [register]);

  useEffect(() => {
    if (params?.irrigation) {
      const { index, ...values } = params.irrigation;
      reset({ ...values, date: new Date(values.date) });
      setIndexToEdit(index);
    }
  }, [params]);

  const {
    date,
    sector,
    variety,
    surface,
    irrigationTime,
    responsible,
    personInCharge,
  } = watch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setValue('date', currentDate);
  };

  const onSubmit = async (values) => {
    const jsonValue = await AsyncStorage.getItem('data');
    const data = jsonValue !== null ? JSON.parse(jsonValue) : [];
    if (indexToEdit === null) {
      data.push({ type: 'Riego', ...values });
    } else {
      data[indexToEdit] = { type: 'Riego', ...values };
    }
    const newData = JSON.stringify(data);
    await AsyncStorage.setItem('data', newData);
    setShowDialog(true);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <Text style={styles.title}>Datos de la actividad</Text>
            <Divider style={styles.divider} />
            <View style={{ flexDirection: 'row', marginBottom: 16, width: '100%' }}>
              <TextInput
                name="date"
                label="FECHA *"
                dense
                autoCompleteType="off"
                value={format(date, 'dd/MM/yyyy')}
                style={{ width: '90%', backgroundColor: 'white' }}
                onFocus={() => setShowDate(true)}
              />
              <IconButton
                icon="calendar"
                style={{ justifyContent: 'center', width: '10%' }}
                onPress={() => setShowDate(true)}
              />
            </View>
            <TextInput
              name="sector"
              label="SECTOR DE HUERTA *"
              keyboardType="numeric"
              dense
              value={sector}
              style={styles.input}
              onChangeText={(event) => setValue('sector', event)}
            />
            <TextInput
              name="variety"
              label="VARIEDAD"
              dense
              value={variety}
              style={styles.input}
              onChangeText={(event) => setValue('variety', event)}
            />
            <TextInput
              name="surface"
              label="SUPERFICIE"
              keyboardType="numeric"
              dense
              value={surface}
              style={styles.input}
              onChangeText={(event) => setValue('surface', event)}
            />
            <TextInput
              name="irrigationTime"
              label="TIEMPO RIEGO *"
              keyboardType="numeric"
              dense
              value={irrigationTime}
              style={styles.input}
              onChangeText={(event) => setValue('irrigationTime', event)}
            />
            <TextInput
              name="responsible"
              label="PERSONA RESPONSABLE *"
              dense
              value={responsible}
              style={styles.input}
              onChangeText={(event) => setValue('responsible', event)}
            />
            <TextInput
              name="personInCharge"
              label="TRABAJADOR ENCARGADO *"
              dense
              value={personInCharge}
              style={styles.input}
              onChangeText={(event) => setValue('personInCharge', event)}
            />
            {showDate && (
              <>
                {Platform.OS === 'ios' ? (
                  <Portal>
                    <Modal
                      visible
                      onDismiss={() => setShowDate(false)}
                      contentContainerStyle={styles.iosModal}
                    >
                      <DateTimePicker
                        style={{ backgroundColor: 'white' }}
                        value={date}
                        mode="date"
                        display="default"
                        locale="es-MX"
                        onChange={onChangeDate}
                      />
                      <Button
                        mode="contained"
                        style={styles.iosModalButton}
                        onPress={() => setShowDate(false)}
                      >
                        Aceptar
                      </Button>
                    </Modal>
                  </Portal>
                ) : (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}
              </>
            )}
            <Button
              style={styles.button}
              mode="contained"
              disabled={!date
                || !sector
                || !irrigationTime
                || !responsible
                || !personInCharge}
              onPress={handleSubmit(onSubmit)}
            >
              Aceptar
            </Button>
          </View>
        </KeyboardAwareScrollView>

      </SafeAreaView>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog()}>
          <View style={styles.confirmationImageContanier}>
            <Image style={styles.confirmationImage} source={require('../assets/images/Guardado.png')} />
          </View>
          <Dialog.Title style={styles.dialogTitle}>Registro guardado</Dialog.Title>
          <Dialog.Content style={styles.dialogContent}>
            <Paragraph style={styles.dialogParagraph}>
              {'Tu actividad se ha guardado correctamente.\n\n'}
            </Paragraph>
            <Button
              mode="contained"
              style={styles.greenButton}
              onPress={() => {
                navigation.navigate(ROUTES.IRRIGATION_LOG, { reset: new Date() });
                setShowDialog(false);
              }}
            >
              <Text style={styles.greenButtonText}>
                Finalizar
              </Text>
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  input: {
    marginBottom: 8,
    width: '100%',
    backgroundColor: 'white'
  },
  button: {
    width: '100%',
    marginTop: 20,
    color: 'white'
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    marginTop: 16
  },
  title: {
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
    width: '100%',
  },
  divider: {
    marginBottom: 8,
    height: 2,
  },
  confirmationImage: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    resizeMode: 'stretch'
  },
  confirmationImageContanier: {
    paddingTop: 24
  },
  dialogTitle: {
    fontSize: 32,
    alignSelf: 'center'
  },
  dialogParagraph: {
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#747678'
  },
  greenButtonText: {
    color: '#f9fdfb',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 16,
  },
  greenButton: {
    backgroundColor: '#2cb972',
    color: 'white',
    width: width * 0.65,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
