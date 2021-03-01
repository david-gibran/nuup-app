/* eslint-disable react/style-prop-object */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Provider as PaperProvider, DefaultTheme
} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Home from './screens/Home';
import Register from './screens/Register';
import Help from './screens/Help';
import Profile from './screens/Profile';

import IrrigationLog from './screens/IrrigationLog';
import EditIrrigation from './screens/EditIrrigation';

import ROUTES from './constants/Routes';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const RegisterStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ROUTES.REGISTER} component={Register} />
    <Stack.Screen name={ROUTES.EDIT_IRRIGATION} component={EditIrrigation} />
    <Stack.Screen name={ROUTES.IRRIGATION_LOG} component={IrrigationLog} />
  </Stack.Navigator>
);

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2cb972',
    },
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === ROUTES.HOME) {
                    iconName = focused
                      ? 'home-sharp'
                      : 'home-outline';
                  } else if (route.name === ROUTES.REGISTER) {
                    iconName = focused
                      ? 'newspaper'
                      : 'newspaper-outline';
                  } else if (route.name === ROUTES.HELP) {
                    iconName = focused
                      ? 'call'
                      : 'call-outline';
                  } else if (route.name === ROUTES.PROFILE) {
                    iconName = focused
                      ? 'person-circle'
                      : 'person-circle-outline';
                  }

                  return <Ionicons name={iconName} size={25} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: '#ffffff',
                inactiveTintColor: '#ffffff',
                showIcon: true,
                activeBackgroundColor: '#006e1f',
                style: {
                  backgroundColor: '#2cb972',
                },
              }}
            >
              <Tab.Screen name={ROUTES.HOME} tabBarIcon tabBarOptions component={Home} />
              <Tab.Screen name={ROUTES.REGISTER} component={RegisterStack} />
              <Tab.Screen name={ROUTES.HELP} component={Help} />
              <Tab.Screen name={ROUTES.PROFILE} component={Profile} />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}
