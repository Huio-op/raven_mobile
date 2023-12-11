import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Notification({ notification }) {
  console.log('noasndoandsa', notification);

  const doNotificationFunction = async () => {
    switch (notification.type) {
      case 'likedPost':
        router.replace(`/bottomTabNavigation/FullPost?postId=${notification.postId}`);
        break;
      case 'userFollowing':
        router.replace(`/bottomTabNavigation/Profile?userId=${notification.userId}`);
        break;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={doNotificationFunction}>
      <Feather name={'bell'} size={26} />
      <Text numberOfLines={2} style={styles.notifContent}>
        {notification.content}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS['light-grey'],
    borderRadius: 15,
    width: '90%',
    padding: 10,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  notifContent: {
    fontWeight: 'bold',
  },
});
