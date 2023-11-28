import { ScrollView, StyleSheet, View } from 'react-native';
import Post from '../../components/posts/Post';
import React from 'react';
import { COLORS, COMPONENTS, FONTS } from '../../constants';
import IconButton from '../../components/IconButton';
import FeatherButton from '../../components/FeatherButton';

const POSTS = [
  {
    id: 1,
    content:
      'Mano porque ninguém me disse que sonegar imposto é tão bom só penso em retirar dinheiro do governo todo dia toda noite',
    likesCount: 15,
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
  const deletePost = async (postId) => {};

  const acceptPost = async (postId) => {};

  return (
    <ScrollView contentContainerStyle={styles.feedPage}>
      {POSTS.map((post, idx) => {
        return (
          <View style={styles.postWrapper} key={idx}>
            <Post key={`${post.id}-${idx}`} post={post} withInteractions={false} />
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
    width: '80%',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  buttonsWrapper: {
    width: 100,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
  },
  checkButton: {
    backgroundColor: '#008000',
  },
});
