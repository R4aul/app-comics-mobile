import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import ForMeScreen from './src/screens/Tabs/ForMeScreen'
import HistoryScreen from './src/screens/Tabs/HistoryScreen'
import NotificationsScreen from './src/screens/NotificationsScreen'


// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

function HomeScreens() {
  return (
    <Tab.Navigator initialRouteName='ForMeScreen'>
      <Tab.Screen name="ForMeScreen" component={ForMeScreen} options={{
        title:'Para mi',
      }} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} options={{
        title:'Historial'
      }}/>
    </Tab.Navigator>
  );
}

// Crear el Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='LoginScreen' component={LoginScreen} />
        <Drawer.Screen name='RegisterScreen' component={RegisterScreen} />
        <Drawer.Screen name="Home" component={HomeScreens}/>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        {/* Aquí colocas el TabNavigator dentro de una pantalla del Drawer */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
