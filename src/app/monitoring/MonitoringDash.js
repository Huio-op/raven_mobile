import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Post from '../../components/posts/Post';
import React from 'react';
import { COLORS, COMPONENTS, FONTS } from '../../constants';
import IconButton from '../../components/IconButton';
import FeatherButton from '../../components/FeatherButton';
import PostApi from '../../service/api/PostApi';
import { useAuth } from '../../hooks/useAuth';

const POSTS = [
  {
    id: 1,
    content:
      'Mano porque ninguém me disse que sonegar imposto é tão bom só penso em retirar dinheiro do governo todo dia toda noite',
    likesCount: 15,
    reportCount: 5,
    owner: {
      name: 'Tim Maia da Sonegação',
      uniqueKey: 'MaiaOfTim',
      userProfile: {
        profile_picture_id: 'user1.png',
      },
    },
  },
  {
    id: 2,
    content:
      'Video jogos digitais\n' + 'top 10 video jogos digitais\n' + 'top 10: gaucho simulator',
    likesCount: 25,
    reportCount: 7,
    owner: {
      name: 'New Araçá City',
      uniqueKey: 'NovaAraca',
      userProfile: {
        profile_picture_id: 'user2.png',
      },
    },
  },
];

export default function MonitoringDash() {
  const { user } = useAuth();

  const deletePost = async (postId) => {
    try {
      PostApi.delete({ postId, userId: user.userId, token: user.token });
    } catch (e) {
      console.error('Error on funtion deletePost()', e);
    }
  };

  const acceptPost = async (postId) => {};

  return (
    <ScrollView contentContainerStyle={styles.feedPage}>
      {POSTS.map((post, idx) => {
        return (
          <View style={styles.postWrapper} key={idx}>
            <View style={styles.postContainer}>
              <Post key={`${post.id}-${idx}`} post={post} withInteractions={false} />
            </View>
            <View style={styles.reportCount}>
              <Text style={{ fontWeight: 'bold' }}>Vezes reportado:</Text>
              <Text>{post.reportCount}</Text>
            </View>
            <View style={styles.buttonsWrapper}>
              <FeatherButton
                icon={'delete'}
                customStyles={styles.deleteButton}
                onPress={() => deletePost(post.id)}
              />
              <FeatherButton
                icon={'check'}
                customStyles={styles.checkButton}
                onPress={() => acceptPost(post.id)}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
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
  postWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 20,
  },
  buttonsWrapper: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
  },
  checkButton: {
    backgroundColor: '#008000',
  },
  reportCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  postContainer: {
    width: 700,
  },
});
