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
import CustomButton from '/components/CustomButton';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, FONTS, images } from '../../constants';
import UserApi from '../../service/api/UserApi';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import PostApi from '../../service/api/PostApi';
import Post from '../../components/posts/Post';

export default function Profile() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userPosts, setUserPosts] = useState([]);

  const fetchUserInfo = async () => {
    try {
      return await UserApi.getUser({ userId: user.userId, token: user.token });
    } catch (e) {
      console.error('Error on function fetchUserInfo()', e);
    }
  };

  const fetchPosts = async () => {
    try {
      let fetchedPosts = await PostApi.fetchAll({ userId: user.userId, token: user.token });
      fetchedPosts = fetchedPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return fetchedPosts;
    } catch (e) {
      console.error('Error on function fetchPosts()', e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [fetchedInfo, fetchedPosts] = await Promise.all([fetchUserInfo(), fetchPosts()]);
        setUserInfo(fetchedInfo);
        setUserPosts(fetchedPosts);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !userInfo) {
    return;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground style={styles.bannerImage} source={images.post2} />
      </View>
      <View style={styles.profileBackground}>
        <View style={styles.profilePicture}>
          <Image style={styles.userPfp} source={images.user1} />
        </View>
        <View style={styles.userFollowStats}>
          <View style={styles.followStat}>
            <Text style={{ fontWeight: 'bold' }}>1k</Text>
            <Text>{t('profile.followers')}</Text>
          </View>
          <View style={styles.followStat}>
            <Text style={{ fontWeight: 'bold' }}>342</Text>
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
          The ending of Ralph Bakshi's "Wizards" is so fucking important to me because 1. It's
          hilarious and 2. I think it's brilliant in the way it says "the best way to eliminate
          fascism is direct force. There's no magic word or ancient prophecy to beat it."
        </Text>
        <View style={styles.buttonsWrapper}>
          <CustomButton
            customStyles={{ paddingHorizontal: 40, borderRadius: 50, height: 40 }}
            title={t('profile.follow')}
          />
          <TouchableOpacity style={styles.moreWrapper}>
            <Feather size={26} name={'more-horizontal'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postsWrapper}>
        {userPosts.map((post, idx) => {
          return <Post key={`${post.id}-${idx}`} post={post} />;
        })}
      </View>
      {/*<View style={styles.exitButtonContainer}>*/}
      {/*  <CustomButton title={'Sair'} customStyles={styles.logoutButton} onPress={logout} />*/}
      {/*</View>*/}
    </ScrollView>
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
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.white,
    position: 'absolute',
    top: -50,
  },
  userPfp: {
    height: 100,
    width: 100,
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
