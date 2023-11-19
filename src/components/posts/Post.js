import { Image, Text, View, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import IconButton from '../IconButton';
import { Feather } from '@expo/vector-icons';

export default function Post({ user = {}, text = '' }) {
  return (
    <View style={styles.Post}>
      <View style={styles.header}>
        <Image
          style={styles.userPfp}
          source={`./assets/images/${user.userProfile.profile_picture_id}`}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.atWrapper}>
            <Text style={styles.userAt}>@</Text>
            <Text style={styles.userAt}>{user.unique_key}</Text>
          </View>
        </View>
        <Feather name={'more-vertical'} style={styles.moreButton} />
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
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  userPfp: {
    borderRadius: '100%',
    border: '1px solid #fff',
    width: 36,
    height: 36,
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
    cursor: 'pointer',
  },
  leftInteractions: {
    flexDirection: 'row',
    gap: 6,
  },
  icon: {
    fontSize: 16,
    cursor: 'pointer',
  },
  counterNumber: {
    fontSize: 18,
  },
  interactions: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  moreButton: {
    fontSize: 20,
    cursor: 'pointer',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  userAt: {
    color: COLORS.grey,
  },
  atWrapper: {
    flexDirection: 'row',
  },
});
