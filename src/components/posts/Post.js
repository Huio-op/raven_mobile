import { Image, Text, View, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import IconButton from '../IconButton';
import { Feather } from '@expo/vector-icons';

export default function Post({ user = {}, text = '' }) {
  return (
    <View style={styles.Post}>
      <View style={styles.header}>
        {/*<Image style={styles.userPfp}></Image>*/}
        <View style={styles.userInfo}>
          <Text style={styles.userName}></Text>
          <Text style={styles.userAt}></Text>
        </View>
        <IconButton icon={'more-vertical'} />
      </View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.interactions}>
        <View style={styles.leftInteractions}>
          <InteractionCounter icon={'message-square'} />
          <InteractionCounter icon={'repeat'} />
          <InteractionCounter icon={'heart'} />
        </View>
        <Feather style={styles.icon} name={'share'} />
      </View>
    </View>
  );
}

const InteractionCounter = ({ icon, count = 0 }) => {
  return (
    <View style={styles.interactionCounter}>
      <Feather style={styles.icon} name={icon} />
      <Text style={styles.counterNumber}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Post: {
    borderRadius: 30,
    backgroundColor: COLORS['light-grey'],
    paddingVertical: '10px',
    paddingHorizontal: '22px',
    flex: 1,
    gap: 5,
  },
  header: {
    display: 'inline-flex',
  },
  userPfp: {
    borderRadius: '100%',
    border: '1px solid #fff',
  },
  text: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'normal',
  },
  interactionCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  leftInteractions: {
    flexDirection: 'row',
    gap: 6,
  },
  icon: {
    fontSize: 16,
  },
  counterNumber: {
    fontSize: 18,
  },
  interactions: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
