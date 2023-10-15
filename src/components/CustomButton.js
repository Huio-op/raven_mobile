import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '/constants';
import noop from 'lodash';
import React from 'react';

const CustomButton = React.forwardRef(
  ({ title, customStyles, customTextStyles, type = BUTTON_TYPES.PRIMARY, onPress = noop }, ref) => {
    return (
      <View ref={ref}>
        <TouchableOpacity style={[styles.button, type.style, customStyles]} onPress={onPress}>
          <Text style={[type.textStyle, customTextStyles]}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  primaryButton: {
    backgroundColor: COLORS.purple,
  },
  secondaryButton: {
    backgroundColor: COLORS['light-grey'],
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: COLORS.purple,
  },
});

export const BUTTON_TYPES = {
  PRIMARY: {
    style: styles.primaryButton,
    textStyle: styles.primaryButtonText,
  },
  SECONDARY: {
    style: styles.secondaryButton,
    textStyle: styles.secondaryButtonText,
  },
};

export default CustomButton;
