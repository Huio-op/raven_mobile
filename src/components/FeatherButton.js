import React from 'react';
import noop from 'lodash';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BUTTON_TYPES } from './CustomButton';
import { COLORS, icons } from '../constants';
import { Feather } from '@expo/vector-icons';

const FeatherButton = React.forwardRef(
  ({ title, customStyles, onPress = noop, icon = 'home' }, ref) => {
    return (
      <TouchableOpacity ref={ref} style={[styles.iconButton, customStyles]} onPress={onPress}>
        <Feather name={icon} style={styles.icons} />
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 100,
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    fontSize: 24,
  },
});

export default FeatherButton;
