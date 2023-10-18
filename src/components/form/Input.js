import { TextInput, StyleSheet } from 'react-native';
import { COLORS } from '/constants';
import React from 'react';

function Input({ customStyle, onChangeText, ...props }, ref) {
  return (
    <TextInput
      style={[styles.inputComponent, customStyle]}
      onChangeText={onChangeText}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  inputComponent: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: 10,
    width: '100%',
  },
});

const InputFR = React.forwardRef(Input);
export default InputFR;
