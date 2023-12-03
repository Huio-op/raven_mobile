import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FONTS } from '/constants';
import { router, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import IconButton from './IconButton';

export default function CustomTitle() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const route = pathname.split('/').pop();

  const canGoBack = route === 'FullPost';

  const goBack = () => {
    router.replace(`/bottomTabNavigation/Feed`);
  };

  return (
    <View style={[styles.titleWrapper]}>
      {canGoBack && (
        <View style={styles.backWrapper}>
          <IconButton onPress={goBack} />
        </View>
      )}
      <Text style={styles.headerTitle}>{t(`mainHeader.${route}`)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...FONTS.h2,
    marginRight: 4,
  },
  backWrapper: {
    left: -132,
    height: 50,
    width: 50,
    position: 'absolute',
  },
});
