import { COLORS, images } from '../constants';

import { StyleSheet, Image, View } from 'react-native';

export default function UiBlocker({ block = false, ...props }) {
  return (
    <>
      {block && (
        <View style={styles.uiBlocker}>
          <Image source={images.spinner} />
        </View>
      )}
      <>{props.children}</>
    </>
  );
}

const styles = StyleSheet.create({
  uiBlocker: {
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1010,
    backgroundColor: '#f1f2f3',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});
