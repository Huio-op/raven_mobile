import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants';

export default function SearchField() {
  return (
    <TouchableOpacity style={styles.SearchField}>
      <Feather name={'search'} size={18} />
    </TouchableOpacity>
  );
}

const styles = new StyleSheet.create({
  SearchField: {
    backgroundColor: COLORS['light-grey'],
    padding: 10,
    borderRadius: 20,
  },
});
