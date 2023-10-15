import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { FONTS } from '/constants';

export default function CustomTitle({ title }) {
  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.headerTitle}>{title}</Text>
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
