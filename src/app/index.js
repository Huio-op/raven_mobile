import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS, COMPONENTS, FONTS, images, SIZES } from '/constants';
import CustomButton, { BUTTON_TYPES } from '/components/CustomButton';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { router, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Index() {
  const { t } = useTranslation();
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
  });

  const navigateToLogin = () => {
    router.replace('/login/Login');
    // router.replace('/bottomTabNavigation/Feed');
  };

  const navigateToCreate = () => {
    router.replace('/createAccount/FirstStep');
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.view}>
        <Image source={images.raven} resizeMode={'contain'} style={styles.headerImage} />
        <View style={styles.itemsCenter}>
          <Text style={styles.welcome}>{t('welcome.welcomeTo')}</Text>
          <Text style={styles.raven}>{t('welcome.raven')}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            title={t('login.enter')}
            onPress={navigateToLogin}
            customStyles={styles.buttonWidth}
          ></CustomButton>
          <CustomButton
            title={t('welcome.create')}
            type={BUTTON_TYPES.SECONDARY}
            customStyles={styles.buttonWidth}
            onPress={navigateToCreate}
          ></CustomButton>
        </View>
        {/*<View style={styles.dotsView}>{progress <= 1 && <DotsView progress={progress} />}</View>*/}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...COMPONENTS.androidSafeArea,
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  itemsCenter: {
    alignItems: 'center',
  },
  dotsView: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
  },
  view: {
    flex: 1,
    marginHorizontal: 22,
    alignItems: 'center',
  },
  headerImage: {
    width: SIZES.width * 0.8,
    marginVertical: SIZES.padding2,
  },
  welcome: {
    ...FONTS.body3,
  },
  raven: {
    ...FONTS.h1,
    marginVertical: SIZES.padding2,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  buttonWidth: {
    width: '100%',
  },
});
