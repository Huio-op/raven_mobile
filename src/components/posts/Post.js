import { Image, Text, View, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import { COLORS, FONTS, images } from '../../constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import PopupMenu from './PopupMenu';
import PostReportApi from '../../service/api/PostReportApi';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import PostApi from '../../service/api/PostApi';
import { router } from 'expo-router';
import WritePostModal from './WritePostModal';

export default function Post({
  post = {},
  withInteractions = true,
  fullPost = false,
  isComment = false,
  originalPostId = null,
  withChild = false,
  customStyle = {},
}) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes);
  const [modalOpen, setModalOpen] = useState(false);
  console.log(' ahbdsahjdbajsdasdas', post);
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

  const openUserProfile = async () => {
    router.replace(`/bottomTabNavigation/Profile?userId=${post.owner.id}`);
  };

  const openPostModal = () => {
    setModalOpen(true);
  };

  const closePostModal = () => {
    setModalOpen(false);
  };

  const content = post.content;
  const owner = post.owner;
  const liked = !isComment && likes.find((like) => like.userId === user.userId);

  return (
    <View
      style={[
        styles.Post,
        fullPost || (isComment && !withChild) ? styles.fullPost : {},
        isComment ? styles.comment : {},
        customStyle,
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.userPfpWrapper} onPress={openUserProfile}>
          <Image style={styles.userPfp} source={images.user1} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfo} onPress={openUserProfile}>
          <Text style={styles.userName}>{owner.name}</Text>
          <View style={styles.atWrapper}>
            <Text style={styles.userAt}>@</Text>
            <Text style={styles.userAt}>{owner.uniqueKey}</Text>
          </View>
        </TouchableOpacity>
        <PopupMenu options={moreMenuOpts} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        {isComment && withChild && (
          <View
            style={{
              borderColor: 'rgba(0,0,0, 0.25)',
              borderWidth: 1,
              height: 'auto',
              marginLeft: 17,
              marginRight: 15,
            }}
          ></View>
        )}
        <View
          style={{
            flexDirection: 'column',
            width: isComment && withChild ? 'calc(100% - 35px)' : '100%',
          }}
        >
          <TouchableOpacity onPress={openPostPage}>
            <Text style={styles.text}>{content}</Text>
          </TouchableOpacity>
          {withInteractions && (
            <View style={styles.interactions}>
              <View style={styles.leftInteractions}>
                <InteractionCounter
                  icon={'message-square'}
                  hideCount={isComment}
                  onPress={openPostModal}
                />
                {!isComment && (
                  <>
                    <InteractionCounter
                      icon={'heart'}
                      count={likes.length}
                      onPress={toggleLike}
                      interacted={liked}
                    />
                  </>
                )}
              </View>
              <Feather style={[styles.icon, { marginRight: 5 }]} name={'share'} />
            </View>
          )}
        </View>
      </View>

      <Modal visible={modalOpen} onRequestClose={closePostModal}>
        <WritePostModal
          handleClose={closePostModal}
          postId={originalPostId || post.id}
          parentCommentId={isComment ? post.id : null}
        />
      </Modal>
    </View>
  );
}

const InteractionCounter = ({
  icon,
  count = 0,
  onPress = () => {},
  style = {},
  interacted = false,
  hideCount = false,
}) => {
  return (
    <Pressable style={[styles.interactionCounter]} onPress={onPress}>
      {!interacted && (
        <Feather style={[styles.icon, interacted ? styles.likedIcon : {}]} name={icon} />
      )}
      {interacted && (
        <FontAwesome style={[styles.icon, interacted ? styles.likedIcon : {}]} name={icon} />
      )}
      {!hideCount && (
        <Text style={[styles.counterNumber, interacted ? styles.likedIcon : {}]}>{count}</Text>
      )}
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
  fullPost: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowColor: 'rgba(0, 0, 0, 0.30)',
    elevation: 3,
    backgroundColor: COLORS['light-grey'],
  },
  comment: {
    position: 'relative',
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
    gap: 10,
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
