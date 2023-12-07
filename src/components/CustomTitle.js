import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FONTS } from '/constants';
import { router, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import IconButton from './IconButton';

export const SPECIAL_ROUTES = [
  {
    key: 'FullPost',
    backRoute: '/bottomTabNavigation/Feed',
  },
  {
    key: 'EditProfile',
    backRoute: '/bottomTabNavigation/Profile',
  },
];

export default function CustomTitle() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const route = pathname.split('/').pop();

  const specialRoute = SPECIAL_ROUTES.find((r) => r.key === route);

  const goBack = () => {
    router.replace(specialRoute.backRoute);
  };

  return (
    <View style={[styles.titleWrapper]}>
      {specialRoute && (
        <View style={styles.backWrapper}>
          <IconButton customStyles={{ height: 35, width: 35 }} onPress={goBack} />
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
    width: 160,
    alignItems: 'center',
    textAlign: 'center',
  },
  backWrapper: {
    left: -90,
    top: -2,
    height: 35,
    width: 35,
    position: 'absolute',
  },
});
