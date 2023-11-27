import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../constants';
import { Redirect } from 'expo-router';

export default function Create() {
  return <Redirect href={'/bottomTabNavigation/Feed'} />;
}
