import { TextInput, StyleSheet, Pressable, View } from 'react-native';
import { COLORS } from '/constants';
import React from 'react';

function Input({ customStyle, onChangeText, disabled = false, onPress = null, ...props }, ref) {
  const emptyFunc = () => {};
  return (
    <Pressable onPress={onPress || emptyFunc}>
      <View pointerEvents={onPress ? 'none' : 'auto'}>
        <TextInput
          style={[styles.inputComponent, customStyle]}
          onChangeText={onChangeText}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          {...props}
        />
      </View>
    </Pressable>
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
