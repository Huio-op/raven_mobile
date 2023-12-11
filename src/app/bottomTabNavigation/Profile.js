import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton, { BUTTON_TYPES } from '/components/CustomButton';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, FONTS, images } from '../../constants';
import UserApi from '../../service/api/UserApi';
import { useTranslation } from 'react-i18next';
import PostApi from '../../service/api/PostApi';
import Post from '../../components/posts/Post';
import { router, useLocalSearchParams } from 'expo-router';
import PopupMenu from '../../components/posts/PopupMenu';
import Avatar from '../../components/profile/Avatar';
import Banner from '../../components/profile/Banner';
import UiBlocker from '../../components/UiBlocker';

export default function Profile() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { userId } = useLocalSearchParams();
  const isOwnProfile = !userId || userId === user.userId;

  const fetchUserInfo = async () => {
    try {
      return await UserApi.getUser({
        profileUserId: isOwnProfile ? user.userId : userId,
        userId: user.userId,
        token: user.token,
      });
    } catch (e) {
      console.error('Error on function fetchUserInfo()', e);
    }
  };

  const fetchPosts = async () => {
    try {
      let fetchedPosts = await PostApi.fetchPostForUser({
        profileId: isOwnProfile ? user.userId : userId,
        userId: user.userId,
        token: user.token,
      });

      fetchedPosts = fetchedPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return fetchedPosts;
    } catch (e) {
      console.error('Error on function fetchPosts()', e);
    }
  };

  const isFollowingUser = async () => {
    try {
      const response = UserApi.isFollowingUser({
        userToSearch: isOwnProfile ? user.userId : userId,
        userId: user.userId,
        token: user.token,
      });
      return response;
    } catch (e) {
      console.error('Error on function isFollowingUser()', e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [fetchedInfo, fetchedPosts, following] = await Promise.all([
          fetchUserInfo(),
          fetchPosts(),
          isFollowingUser(),
        ]);
        setUserInfo(fetchedInfo);
        setUserPosts(fetchedPosts);
        setIsFollowing(following);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !userInfo) {
    return;
  }

  const backToFeed = () => {
    router.replace(`/bottomTabNavigation/Feed`);
  };

  const profileOpts = [
    {
      title: t('profile.logout'),
      icon: 'log-out',
      action: async () => {
        logout();
      },
    },
  ];

  const editProfile = () => {
    router.replace(`/bottomTabNavigation/EditProfile`);
  };

  const followUser = async () => {
    try {
      await UserApi.userFollow({ userToFollow: userId, userId: user.userId, token: user.token });
      const updatedFollowing = await isFollowingUser();
      setIsFollowing(updatedFollowing);
      const updatedUserInfo = await fetchUserInfo();
      setUserInfo(updatedUserInfo);
    } catch (e) {
      console.error('Error on function followUser()', e);
    }
  };

  return (
    <UiBlocker block={loading}>
      <ScrollView style={styles.container}>
        <Banner />
        <View style={styles.profileBackground}>
          <Avatar customStyles={{ position: 'absolute', top: -50 }} />
          <View style={styles.userFollowStats}>
            <View style={styles.followStat}>
              <Text style={{ fontWeight: 'bold' }}>{userInfo._count.followedBy}</Text>
              <Text>{t('profile.followers')}</Text>
            </View>
            <View style={styles.followStat}>
              <Text style={{ fontWeight: 'bold' }}>{userInfo._count.following}</Text>
              <Text>{t('profile.following')}</Text>
            </View>
          </View>
          <View style={styles.userNameWrapper}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userKey}>@{userInfo.uniqueKey}</Text>
          </View>
          <Text
            style={{
              padding: 20,
            }}
          >
            {userInfo.userProfile.bio}
          </Text>
          <View style={styles.buttonsWrapper}>
            {isOwnProfile && (
              <CustomButton
                customStyles={{ paddingHorizontal: 40, borderRadius: 50, height: 40 }}
                title={t('profile.edit')}
                type={BUTTON_TYPES.WHITE}
                onPress={editProfile}
              />
            )}
            {!isOwnProfile && (
              <CustomButton
                customStyles={{ paddingHorizontal: 40, borderRadius: 50, height: 40 }}
                title={t(isFollowing ? 'profile.following' : 'profile.follow')}
                type={isFollowing ? BUTTON_TYPES.WHITE : BUTTON_TYPES.PRIMARY}
                onPress={followUser}
              />
            )}

            {isOwnProfile && (
              <PopupMenu
                options={profileOpts}
                icon={'more-horizontal'}
                customStyles={styles.moreWrapper}
              />
            )}
          </View>
        </View>
        <View style={styles.postsWrapper}>
          {userPosts.map((post, idx) => {
            return <Post key={`${post.id}-${idx}`} post={post} />;
          })}
        </View>
      </ScrollView>
    </UiBlocker>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 130,
    width: '100%',
  },
  bannerImage: {
    height: 180,
    width: '100%',
  },
  profileBackground: {
    backgroundColor: COLORS['light-grey'],
    width: '100%',
    minHeight: 300,
    borderRadius: 55,
    alignItems: 'center',
  },
  userFollowStats: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  followStat: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  userNameWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  userName: {
    fontWeight: 'bold',
    ...FONTS.h2,
  },
  userKey: {
    ...FONTS.h4,
    fontWeight: 'normal',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  moreWrapper: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
  postsWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    gap: 10,
    marginBottom: 70,
    paddingHorizontal: 10,
  },
  exitButtonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
  },
});
