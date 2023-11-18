import {
  Image,
  Pressable,
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import RoundedIconButton from './RoundedIconButton';
import { useMemo, useState } from 'react';

export default function CreatePostButton() {
  const [open, setOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const mainRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const cameraTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -160],
  });

  const createTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.submenu}>
        <RoundedIconButton
          icon={'camera'}
          customStyles={[
            styles.hiddenButton,
            {
              display: open ? 'block' : 'none',
              transform: [
                {
                  translateY: cameraTranslate,
                },
              ],
            },
          ]}
        />
        <RoundedIconButton
          icon={'edit'}
          customStyles={[
            styles.hiddenButton,
            {
              display: open ? 'block' : 'none',
              transform: [
                {
                  translateY: createTranslate,
                },
              ],
            },
          ]}
        />
      </View>
      <RoundedIconButton
        icon={'plus'}
        onPress={toggleMenu}
        customInnerStyle={{
          transform: [
            {
              rotate: mainRotation,
            },
          ],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    right: 0,
  },
  submenu: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // top: -135,
  },
  hiddenButton: {
    position: 'absolute',
    display: 'none',
  },
});
