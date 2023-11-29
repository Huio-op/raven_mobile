import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FONTS, COMPONENTS } from '/constants';
import { useTranslation } from 'react-i18next';
import Post from '../../components/posts/Post';
import PostApi from '../../service/api/PostApi';
import { useAuth } from '../../hooks/useAuth';

// const POSTS = [
//   {
//     id: 1,
//     content:
//       'Mano porque ninguém me disse que sonegar imposto é tão bom só penso em retirar dinheiro do governo todo dia toda noite',
//     likesCount: 15,
//     owner: {
//       name: 'Tim Maia da Sonegação',
//       uniqueKey: 'MaiaOfTim',
//       userProfile: {
//         profile_picture_id: 'user1.png',
//       },
//     },
//   },
//   {
//     id: 2,
//     content:
//       'Video jogos digitais\n' + 'top 10 video jogos digitais\n' + 'top 10: gaucho simulator',
//     likesCount: 25,
//     owner: {
//       name: 'New Araçá City',
//       uniqueKey: 'NovaAraca',
//       userProfile: {
//         profile_picture_id: 'user2.png',
//       },
//     },
//   },
// ];

export default function Feed() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      let fetchedPosts = await PostApi.fetchAll({ userId: user.userId, token: user.token });
      fetchedPosts = fetchedPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPosts(fetchedPosts);
    } catch (e) {
      console.error('Error on function fetchPosts()', e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <View style={styles.view}>
        <ScrollView contentContainerStyle={styles.feedPage}>
          {posts.map((post, idx) => {
            return <Post key={`${post.id}-${idx}`} post={post} />;
          })}
        </ScrollView>
      </View>
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
    paddingHorizontal: 22,
  },
  feedPage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    gap: 10,
    marginBottom: 50,
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
