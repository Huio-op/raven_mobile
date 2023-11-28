import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONTS, images } from '../../constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function Post({ post = {} }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const content = post.content;
  const owner = post.owner;
  const likeCounter = post.likesCount + (liked ? 1 : 0) || post.id * 3 + (liked ? 1 : 0);

  return (
    <View style={styles.Post}>
      <View style={styles.header}>
        <View style={styles.userPfpWrapper}>
          <Image style={styles.userPfp} source={images.user1} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{owner.name}</Text>
          <View style={styles.atWrapper}>
            <Text style={styles.userAt}>@</Text>
            <Text style={styles.userAt}>{owner.uniqueKey}</Text>
          </View>
        </View>
        <Feather name={'more-vertical'} style={styles.moreButton} />
      </View>
      <Text style={styles.text}>{content}</Text>
      <View style={styles.interactions}>
        <View style={styles.leftInteractions}>
          <InteractionCounter icon={'message-square'} />
          <InteractionCounter icon={'repeat'} />
          <InteractionCounter
            icon={'heart'}
            count={likeCounter}
            onPress={toggleLike}
            interacted={liked}
          />
        </View>
        <Feather style={styles.icon} name={'share'} />
      </View>
    </View>
  );
}

const InteractionCounter = ({
  icon,
  count = 0,
  onPress = () => {},
  style = {},
  interacted = false,
}) => {
  return (
    <Pressable style={[styles.interactionCounter]} onPress={onPress}>
      {!interacted && (
        <Feather style={[styles.icon, interacted ? styles.likedIcon : {}]} name={icon} />
      )}
      {interacted && (
        <FontAwesome style={[styles.icon, interacted ? styles.likedIcon : {}]} name={icon} />
      )}
      <Text style={[styles.counterNumber, interacted ? styles.likedIcon : {}]}>{count}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Post: {
    borderRadius: 30,
    backgroundColor: COLORS['light-grey'],
    paddingVertical: 10,
    paddingHorizontal: 22,
    gap: 5,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  userPfpWrapper: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.white,
    width: 36,
    height: 36,
  },
  userPfp: {
    borderRadius: 100,
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
  moreButton: {
    fontSize: 20,
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
  likedIcon: {
    color: COLORS.blue,
  },
});
