import { Image, Platform, StyleSheet, View } from 'react-native';
import { COLORS, icons } from '/constants';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';

export default function BottomTabNavigationLayout() {
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: styles.tabBarStyle,
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name={'Feed'}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.viewCenter}>
                <Image source={icons.home} resizeMode={'contain'} style={styles.bottomTabIcons} />
                {focused && <View style={styles.selectedTab} />}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name={'Groups'}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.viewCenter}>
                <Image source={icons.groups} resizeMode={'contain'} style={styles.bottomTabIcons} />
                {focused && <View style={styles.selectedTab} />}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name={'Create'}
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

      <Tabs.Screen
        name={'Notifications'}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.viewCenter}>
                <Image
                  source={icons.notifications}
                  resizeMode={'contain'}
                  style={styles.bottomTabIcons}
                />
                {focused && <View style={styles.selectedTab} />}
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name={'Profile'}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.viewCenter}>
                <Image
                  source={icons.profile}
                  resizeMode={'contain'}
                  style={styles.bottomTabIcons}
                />
                {focused && <View style={styles.selectedTab} />}
              </View>
            );
          },
        }}
      />
    </Tabs>
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
  selectedTab: {
    width: 25,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    bottom: -8,
  },
  viewCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
