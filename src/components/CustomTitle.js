import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FONTS } from '/constants';
import { usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function CustomTitle() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const route = pathname.split('/').pop();

  return (
    <View style={styles.titleWrapper}>
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
    ...FONTS.h1,
    marginRight: 4,
  },
});
