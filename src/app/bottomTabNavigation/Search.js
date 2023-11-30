import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import React from 'react';
import SearchField from '../../components/form/SearchField';

export default function Search() {
  return (
    <View style={styles.container}>
      <SearchField />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  tabText: {
    ...FONTS.h2,
  },
});
