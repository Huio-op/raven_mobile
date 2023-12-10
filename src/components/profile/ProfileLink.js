import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Avatar from './Avatar';
import { COLORS, images } from '../../constants';
import { router } from 'expo-router';

export default function ProfileLink({ user }) {
  const openUserProfile = async () => {
    router.replace(`/bottomTabNavigation/Profile?userId=${user.id}`);
  };

  return (
    <TouchableOpacity onPress={openUserProfile} style={styles.container}>
      <View style={styles.userPfpWrapper}>
        <Image style={styles.userPfp} source={images.user1} />
      </View>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.uniqueKey}>@{user.uniqueKey}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS['light-grey'],
    borderRadius: 30,
    padding: 5,
    width: 125,
    alignItems: 'center',
    justifyContent: 'center',
    height: 125,
    marginRight: 5,
  },
  userPfpWrapper: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.white,
    width: 45,
    height: 45,
  },
  userPfp: {
    borderRadius: 100,
    width: 45,
    height: 45,
  },
  userName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  uniqueKey: {
    color: COLORS.grey,
  },
});
