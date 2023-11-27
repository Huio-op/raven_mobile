import { Image, ImageBackground, Platform, StyleSheet, View } from 'react-native';
import { COLORS, icons, images } from '/constants';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, Tabs } from 'expo-router';
import CustomBottomTab from '../../components/navigation/CustomBottomTab';
import CreatePostButton from '../../components/createPost/CreatePostButton';
import { useAuth } from '../../hooks/useAuth';

export default function BottomTabNavigationLayout() {
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: styles.tabBarStyle,
  };

  const { user, isLoading } = useAuth();

  if (!user) {
    return <Redirect href="/" />;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Tabs screenOptions={screenOptions} tabBar={(props) => <CustomBottomTab {...props} />}>
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
                  <Image
                    source={icons.groups}
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
          name={'Create'}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => {
              return <CreatePostButton />;
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
    </>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 90,
    backgroundColor: COLORS.purple,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'transparent',
    border: 'none',
  },
  createTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? 58 : 68,
    height: Platform.OS === 'ios' ? 58 : 68,
    top: Platform.OS === 'ios' ? -28 : -38,
    borderRadius: 100,
    borderColor: '#dedede',
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
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
