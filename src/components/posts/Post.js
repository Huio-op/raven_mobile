import { Image, Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, images } from '../../constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import PopupMenu from './PopupMenu';
import PostReportApi from '../../service/api/PostReportApi';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import PostApi from '../../service/api/PostApi';
import { router } from 'expo-router';

export default function Post({ post = {}, withInteractions = true }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes);

  const toggleLike = async () => {
    try {
      const res = await PostApi.likePost({
        postId: post.id,
        userId: user.userId,
        token: user.token,
      });
      if (res === 'Deleted') {
        likes.splice(
          likes.indexOf(likes.find((l) => l.postId === post.id && l.userId === user.userId)),
          1
        );
      } else {
        likes.push(res);
      }
      setLikes([...likes]);
    } catch (e) {
      console.error('Error on function toggleLike()', e);
    }
  };

  const moreMenuOpts = [
    {
      title: 'post.more.report',
      icon: 'alert-triangle',
      action: async () => {
        try {
          await PostReportApi.reportPost({
            postId: post.id,
            userId: user.userId,
            token: user.token,
          });
          alert(t('post.more.reportSuccess'));
        } catch (e) {
          console.error('Error on Report Action', e);
        }
      },
    },
  ];

  const openPostPage = async () => {
    router.replace(`/bottomTabNavigation/FullPost?postId=${post.id}`);
  };

  const content = post.content;
  const owner = post.owner;
  const liked = likes.find((like) => like.userId === user.userId);

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
        {/*<Feather name={'more-vertical'} style={styles.moreButton} />*/}
        <PopupMenu options={moreMenuOpts} />
      </View>
      <TouchableOpacity onPress={openPostPage}>
        <Text style={styles.text}>{content}</Text>
      </TouchableOpacity>
      {withInteractions && (
        <View style={styles.interactions}>
          <View style={styles.leftInteractions}>
            <InteractionCounter icon={'message-square'} />
            <InteractionCounter icon={'repeat'} />
            <InteractionCounter
              icon={'heart'}
              count={likes.length}
              onPress={toggleLike}
              interacted={liked}
            />
          </View>
          <Feather style={styles.icon} name={'share'} />
        </View>
      )}
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
    paddingBottom: 15,
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
