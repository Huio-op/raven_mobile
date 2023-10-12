import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants';
import { Create, Feed, Notifications, Profile } from '../screens';

import { MaterialIcons } from '@expo/vector-icons';
import Groups from '../screens/Groups';
import { Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigation() {
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: styles.tabBarStyle,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={'Feed'}
        component={Feed}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name={'home'}
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={'Groups'}
        component={Groups}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name={'groups'}
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name={'Create'}
        component={Create}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <LinearGradient colors={['#F68464', '#EEA849']} style={styles.createTab}>
                <MaterialIcons name={'add'} size={24} color={COLORS.black} />
              </LinearGradient>
            );
          },
        }}
      />

      <Tab.Screen
        name={'Notifications'}
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name={'notifications'}
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name={'person'}
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  createTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? 50 : 60,
    height: Platform.OS === 'ios' ? 50 : 60,
    top: Platform.OS === 'ios' ? -10 : -20,
    borderRadius: 22,
    borderColor: '#fff',
    borderWidth: 4,
  },
});
