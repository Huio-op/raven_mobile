import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FONTS, COMPONENTS } from '/constants';
import { useTranslation } from 'react-i18next';

export default function Feed() {
  const { t } = useTranslation();

  const renderHeader = () => {
    return (
      <View style={styles.headerWrapper}>
        <Text style={styles.tabText}>Feed</Text>
        {/*<View style={styles.profileWrapper}>*/}
        {/*  <TouchableOpacity style={styles.profileOpacity}></TouchableOpacity>*/}
        {/*</View>*/}
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
    ...COMPONENTS.androidSafeArea,
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
    paddingTop: 10,
    height: '100%',
  },
  profileWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileOpacity: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#18274B',
    shadowOffset: {
      width: 0,
      height: 4.5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6.5,
    elevation: 2,
    borderRadius: 22,
  },
  tabText: {
    ...FONTS.h2,
  },
});
