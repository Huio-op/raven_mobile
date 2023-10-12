import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants';
import { Create, Feed, Notifications, Profile } from '../screens';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { icons } from '../constants';
import Groups from '../screens/Groups';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

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
              <Image source={icons.home} resizeMode={'contain'} style={styles.bottomTabIcons} />
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
              <Image source={icons.groups} resizeMode={'contain'} style={styles.bottomTabIcons} />
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
              <View style={styles.createTab}>
                <BlurView tint={'light'} intensity={20} style={styles.blurStyle}>
                  <LinearGradient
                    colors={['rgba(250,250,250,0.3)', 'rgba(250,250,250,0.4)']}
                    style={styles.gradient}
                  >
                    <Image
                      source={icons.plus}
                      resizeMode={'contain'}
                      style={styles.bottomTabIcons}
                    />
                  </LinearGradient>
                </BlurView>
              </View>
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
              <Image
                source={icons.notifications}
                resizeMode={'contain'}
                style={styles.bottomTabIcons}
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
              <Image source={icons.profile} resizeMode={'contain'} style={styles.bottomTabIcons} />
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
    backgroundColor: COLORS.purple,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  createTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? 50 : 60,
    height: Platform.OS === 'ios' ? 50 : 60,
    top: Platform.OS === 'ios' ? -10 : -20,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 2,
    overflow: 'hidden',
  },
  blurStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabIcons: {
    width: 23,
    height: 23,
    zIndex: 1,
  },
});
