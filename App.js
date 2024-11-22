import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForMeScreen from './src/screens/Tabs/ForMeScreen';
import HistoryScreen from './src/screens/Tabs/HistoryScreen';
import NotificarionsScreen from './src/screens/Tabs/NotificarionsScreen';
import ComicScreen from './src/screens/Tabs/comics/ComicScreen';
import CategoriesComics from './src/screens/drawer/CategoriesComics';
import ComicsForCategories from './src/screens/stacks/ComicsForCategories';
import MyFavoritesScreen from './src/screens/drawer/MyFavoritesScreen';
import MyBookingsScreen from './src/screens/drawer/MyBookingsScreen';
import MyComicsFavoritesScreen from './src/screens/drawer/MyComicsFavoritesScreen';

import AuthContext from './src/contexts/AuthContext';
import { loaduser, logout } from './src/services/AuthServices';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeScreens() {
  return (
    <Tab.Navigator
      initialRouteName="ForMeScreen"
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ForMeScreen"
        component={ForMeScreen}
        options={{
          title: 'Para mí',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: 'Historial',
          tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificarionsScreen}
        options={{
          title: 'Notificaciones',
          tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const { user, setUser } = React.useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', onPress: async () => {
        setUser(null)
        await logout();
      } },
    ]);
  };

  return (
    <Drawer.Navigator>
      {user ? (
        <>
          <Drawer.Screen
            name="Home"
            component={HomeScreens}
            options={{
              title: 'Inicio',
              headerRight: () => (
                <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
          <Drawer.Screen
            name="CategoriesComics"
            component={CategoriesComics}
            options={{
              title: 'Categorías',
              headerRight: () => (
                <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
          <Drawer.Screen
            name="MyFavoritesScreen"
            component={MyFavoritesScreen}
            options={{
              title: 'Mis Preferencias',
              headerRight: () => (
                <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
          <Drawer.Screen
            name="MyBookingsScreen"
            component={MyBookingsScreen}
            options={{
              title: 'Mis Reservas',
              headerRight: () => (
                <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
          <Drawer.Screen
            name="MyComicsFavoritesScreen"
            component={MyComicsFavoritesScreen}
            options={{
              title: 'Mis cómics favoritos',
              headerRight: () => (
                <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
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
        <Stack.Navigator>
          <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ComicScreen" component={ComicScreen} />
          <Stack.Screen
            name="ComicsForCategories"
            component={ComicsForCategories}
            options={{
              title: 'Cómics por categoría',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
