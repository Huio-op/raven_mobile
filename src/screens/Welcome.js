import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, images, SIZES } from '../constants';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useNavigation } from '@react-navigation/native';
import DotsView from '../components/DotsView';

export default function Welcome() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(intervalId);
          return prevProgress;
        }
        return prevProgress + 0.1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      //Navigate to Feed Screen
      navigation.navigate('BottomTabNavigation', { name: 'Feed' });
    }
  }, [progress, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Image source={images.hero} resizeMode={'contain'} style={styles.headerImage} />
        <View style={styles.itemsCenter}>
          <Text style={styles.welcome}>{t('welcome.welcomeTo')}</Text>
          <Text style={styles.raven}>{t('welcome.raven')}</Text>
        </View>
        <View style={styles.dotsView}>{progress <= 1 && <DotsView progress={progress} />}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
});
