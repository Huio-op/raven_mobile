import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants';

export default function Notification() {
  return (
    <View style={styles.container}>
      <Text>Teste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS['light-grey'],
    borderRadius: 50,
    width: '90%',
    padding: 10,
  },
});
