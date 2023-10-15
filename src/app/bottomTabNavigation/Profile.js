import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import CustomButton from '/components/CustomButton';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Link href={'/'} replace={true} asChild={true}>
        <CustomButton title={'Sair'} customStyles={styles.logoutButton} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    width: '100%',
  },
});
