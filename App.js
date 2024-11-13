import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';  // Stack Navigator
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForMeScreen from './src/screens/Tabs/ForMeScreen';
import HistoryScreen from './src/screens/Tabs/HistoryScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import AuthContext from './src/contexts/AuthContext';
import ComicScreen from './src/screens/Tabs/comics/ComicScreen';
import CategoriesComics from './src/screens/drawer/CategoriesComics'
import ComicsForCategories from './src/screens/stacks/ComicsForCategories'
import MyFavoritesScreen from './src/screens/drawer/MyFavoritesScreen'
import MyBookingsScreen from './src/screens/drawer/MyBookingsScreen'
import { loaduser } from './src/services/AuthServices';

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

function HomeScreens() {
  return (
    <Tab.Navigator initialRouteName='ForMeScreen'>
      <Tab.Screen name="ForMeScreen" component={ForMeScreen} options={{ title: 'Para mi'}} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} options={{ title: 'Historial' }} />
    </Tab.Navigator>
  );
}

// Crear el Drawer Navigator
const Drawer = createDrawerNavigator();

// Crear el Stack Navigator
const Stack = createStackNavigator();  // Stack para ComicScreen y el Drawer

export default function App() {
  const [user, setUser] = React.useState();
  
  React.useEffect(() => {
    async function runEffect() {
      try {
        const user = await loaduser();
        setUser(user);
        console.log(user);
      } catch (error) {
        console.log('Fail load user', error);
      }
    }
    runEffect();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {/* Stack Navigator que maneja el Drawer y ComicScreen */}
        <Stack.Navigator>
          {/* Drawer Navigator envuelto en una pantalla de Stack */}
          <Stack.Screen 
            name="Drawer" 
            component={DrawerNavigator} 
            options={{ headerShown: false }} 
          />
          {/* ComicScreen está en el Stack pero fuera del Drawer */}
          <Stack.Screen 
            name="ComicScreen" 
            component={ComicScreen} 
          />
          <Stack.Screen 
            name='ComicsForCategories'
            component={ComicsForCategories}
            options={{
              title:'Comics por categoria'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// Drawer Navigator que solo contiene las pantallas del Drawer
function DrawerNavigator() {
  const { user } = React.useContext(AuthContext);

  return (
    <Drawer.Navigator>
      {user ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreens} options={{
            title:'Inicio'
          }}/>
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          {/* No agregamos ComicScreen aquí */}
          <Drawer.Screen name='CategoriesComics' component={CategoriesComics} options={{
            title:'Categorias'
          }}/>
          <Drawer.Screen name='MyFavoritesScreen' component={MyFavoritesScreen} options={{
            title:'Mis Favoritos'
          }} />
          <Drawer.Screen name='MyBookinsScreen' component={MyBookingsScreen} options={{
            title:'Mis Recervas'
          }} />
        </>
      ) : (
        <>
          <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{ swipeEnabled: false }} />
          <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ swipeEnabled: false }} />
        </>
      )}
    </Drawer.Navigator>
  );
}
