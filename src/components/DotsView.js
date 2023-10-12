import { COLORS } from '../constants';
import { StyleSheet, View } from 'react-native';

export default function DotsView({
  progress,
  dotSize = 10,
  dotSpacing = 5,
  dotColor = 'gray',
  activeColor = COLORS.black,
  numDots = 3,
}) {
  const dots = [];

  for (let i = 0; i < numDots; i++) {
    dots.push(
      <View
        key={i}
        style={[
          { borderWidth: 1, borderColor: 'transparent' },
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            marginHorizontal: dotSpacing / 2,
          },
          progress >= i / (numDots - 1)
            ? {
                backgroundColor: activeColor,
              }
            : {
                backgroundColor: dotColor,
              },
        ]}
      />
    );
  }
  return <View style={styles.view}>{dots}</View>;
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
