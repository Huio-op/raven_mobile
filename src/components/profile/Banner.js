import { images } from '../../constants';
import { ImageBackground, View, StyleSheet } from 'react-native';
import React from 'react';

export default function Banner({ image = images.post2, customStyles = {} }) {
  return (
    <View style={styles.banner}>
      <ImageBackground
        style={styles.bannerImage}
        source={typeof image === 'string' ? { uri: image } : image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 130,
    width: '100%',
  },
  bannerImage: {
    height: 180,
    width: '100%',
  },
});
