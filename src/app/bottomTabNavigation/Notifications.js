import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../constants';

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.tabText}>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  tabText: {
    ...FONTS.h2,
  },
});
