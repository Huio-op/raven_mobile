import { COLORS, images } from '../../constants';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import noop from 'lodash';

const DEFAULT_IMAGE = '../../../assets/images/user1.jpg';
export default function Avatar({ image = images.user1, customStyles = {}, onPress = noop }) {
  return (
    <TouchableOpacity style={[styles.profilePicture, customStyles]} onPress={onPress}>
      <Image style={styles.userPfp} source={typeof image === 'string' ? { uri: image } : image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userPfp: {
    height: 100,
    width: 100,
  },
});
