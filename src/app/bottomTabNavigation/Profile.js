import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import CustomButton from '/components/CustomButton';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.exitButtonContainer}>
        <CustomButton title={'Sair'} customStyles={styles.logoutButton} onPress={logout} />
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
