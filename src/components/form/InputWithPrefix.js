import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { COLORS } from '../../constants';
import React from 'react';

function InputWithPrefix(
  {
    customStyle,
    onChangeText,
    disabled = false,
    onPress = null,
    prefix = '',
    suffix = '',
    ...props
  },
  ref
) {
  const emptyFunc = () => {};
  return (
    <Pressable onPress={onPress || emptyFunc}>
      <View pointerEvents={onPress ? 'none' : 'auto'} style={styles.inputContainer}>
        <Text style={styles.prefix}>{prefix}</Text>
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
    paddingRight: 10,
    paddingVertical: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  prefix: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});

const InputFR = React.forwardRef(InputWithPrefix);
export default InputFR;
