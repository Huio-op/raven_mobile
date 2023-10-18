import React from 'react';
import noop from 'lodash';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BUTTON_TYPES } from './CustomButton';
import { COLORS, icons } from '../constants';

const IconButton = React.forwardRef(
  ({ title, customStyles, customTextStyles, onPress = noop, icon = icons.back_arrow }, ref) => {
    return (
      <TouchableOpacity ref={ref} style={[styles.iconButton, customStyles]} onPress={onPress}>
        <Image source={icon} resizeMode={'contain'} style={styles.bottomTabIcons} />
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
    borderColor: COLORS['light-grey'],
    borderWidth: 2,
  },
});

export default IconButton;
