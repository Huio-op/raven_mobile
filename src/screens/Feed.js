import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { FONTS } from '../constants';

export default function Feed() {
  const renderHeader = () => {
    return (
      <View style={styles.headerWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.headerTitle}>My Networks</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <View style={styles.view}>{renderHeader()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  view: {
    flex: 1,
    paddingHorizontal: 22,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    ...FONTS.body4,
    marginRight: 4,
  },
});
