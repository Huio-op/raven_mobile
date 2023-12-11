import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FONTS, COMPONENTS } from '/constants';
import { useTranslation } from 'react-i18next';
import Post from '../../components/posts/Post';
import PostApi from '../../service/api/PostApi';
import { useAuth } from '../../hooks/useAuth';
import { useLocalSearchParams } from 'expo-router';
import UserApi from '../../service/api/UserApi';
import UiBlocker from '../../components/UiBlocker';

export default function Feed() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [posts, setPosts] = useState(null);
  const { refresh } = useLocalSearchParams();
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedUser = await UserApi.getUser({
        profileUserId: user.userId,
        userId: user.userId,
        token: user.token,
      });

      let fetchedPosts = null;

      if (fetchedUser._count.following > 5) {
        fetchedPosts = await PostApi.fetchFollowingPosts({
          userId: user.userId,
          token: user.token,
        });
      } else {
        fetchedPosts = await PostApi.fetchAll({ userId: user.userId, token: user.token });
      }

      fetchedPosts = fetchedPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPosts(fetchedPosts);
    } catch (e) {
      console.error('Error on function fetchPosts()', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      fetchPosts();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <UiBlocker block={loading}>
        <View style={styles.view}>
          {posts && (
            <FlatList
              onLayout={(event) => setLayout(event.nativeEvent.layout)}
              contentContainerStyle={styles.feedPage}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              data={posts}
              renderItem={({ item, idx }) => {
                return (
                  <Post
                    key={`${item.id}-${idx}`}
                    post={item}
                    customStyle={{ width: layout.width - 20 }}
                  />
                );
              }}
            />
          )}
        </View>
      </UiBlocker>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    ...COMPONENTS.androidSafeArea,
    flex: 1,
    backgroundColor: '#FFF',
  },
  view: {
    flex: 1,
  },
  feedPage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    gap: 10,
    marginBottom: 70,
    paddingHorizontal: 10,
    width: '100%',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    height: '100%',
  },
  profileWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileOpacity: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#18274B',
    shadowOffset: {
      width: 0,
      height: 4.5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6.5,
    elevation: 2,
    borderRadius: 22,
  },
  tabText: {
    ...FONTS.h2,
  },
});
