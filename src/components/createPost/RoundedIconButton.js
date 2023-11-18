import { Platform, TouchableWithoutFeedback, View, StyleSheet, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function RoundedIconButton({ onPress, icon, customStyles = [], customInnerStyle }) {
  return (
    <Animated.View style={[styles.roundedButton, [...customStyles]]}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <BlurView tint={'light'} intensity={20} style={styles.blurStyle}>
          <LinearGradient
            colors={['rgba(250,250,250,0.3)', 'rgba(250,250,250,0.4)']}
            style={styles.gradient}
          >
            <Animated.View style={[styles.button, customInnerStyle]}>
              <Feather name={icon} size={26} style={styles.roundButton} />
            </Animated.View>
          </LinearGradient>
        </BlurView>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  roundedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? 58 : 68,
    height: Platform.OS === 'ios' ? 58 : 68,
    top: Platform.OS === 'ios' ? -28 : -38,
    borderRadius: 100,
    borderColor: '#dedede',
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  roundButton: {
    width: 26,
    height: 26,
    zIndex: 1,
  },
  blurStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
