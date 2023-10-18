import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import CustomButton from '/components/CustomButton';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.exitButtonContainer}>
        <Link href={'/'} replace={true} asChild={true}>
          <CustomButton title={'Sair'} customStyles={styles.logoutButton} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButtonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
  },
});
