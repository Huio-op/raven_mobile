import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import Input from './Input';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import noop from 'lodash';

export default function SearchField({ onSearch = noop }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState();

  const doSearch = async () => {
    await onSearch(searchTerm);
  };

  return (
    <View>
      <View style={styles.SearchField}>
        <Input
          outerStyle={{ flex: 1 }}
          customStyle={styles.field}
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
        />
        <TouchableOpacity style={styles.SearchButton} onPress={doSearch}>
          <Feather style={{ color: COLORS.white }} name={'search'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = new StyleSheet.create({
  SearchField: {
    backgroundColor: COLORS['light-grey'],
    padding: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    height: 25,
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: COLORS['light-grey'],
    width: '100%',
  },
  SearchButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 100,
    padding: 5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
