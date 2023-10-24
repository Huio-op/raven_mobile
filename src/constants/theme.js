import { Dimensions, Platform, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('window');

export const COLORS = {
  orange: '#EEA849',
  'light-blue': '#A9ADBC',
  white: '#FFFFFF',
  cream: '#FFF9E8',
  black: '#212121',
  blue: '#027DEF',
  purple: '#0F004A',
  'light-grey': '#E6EEFA',
  red: '#ff0000',
};

export const SIZES = {
  // global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 14,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'black',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
    color: COLORS.black,
  },
  h1: {
    fontWeight: 'bold',
    fontSize: SIZES.h1,
    lineHeight: 36,
    color: COLORS.black,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: SIZES.h2,
    lineHeight: 30,
    color: COLORS.black,
  },
  h3: {
    fontWeight: 'bold',
    fontSize: SIZES.h3,
    lineHeight: 22,
    color: COLORS.black,
  },
  h4: {
    fontWeight: 'bold',
    fontSize: SIZES.h4,
    lineHeight: 20,
    color: COLORS.black,
  },
  body1: {
    fontWeight: 'regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
    color: COLORS.black,
  },
  body2: {
    fontWeight: 'regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
    color: COLORS.black,
  },
  body3: {
    fontWeight: 'regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
    color: COLORS.black,
  },
  body4: {
    fontWeight: 'regular',
    fontSize: SIZES.body4,
    lineHeight: 20,
    color: COLORS.black,
  },
};

export const COMPONENTS = {
  androidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  defaultGradient: {
    height: 135,
    width: 135,
    borderRadius: 135,
    position: 'absolute',
  },
};

const appTheme = { COLORS, SIZES, FONTS, COMPONENTS };

export default appTheme;
