import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import React from 'react';

export default function Groups() {
  return (
    <View style={styles.container}>
      <Text style={styles.tabText}>Groups</Text>
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
