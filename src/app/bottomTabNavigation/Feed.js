import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FONTS, COMPONENTS } from '/constants';
import { useTranslation } from 'react-i18next';
import Post from '../../components/posts/Post';

const posts = [
  {
    id: 1,
    text: 'Mano porque ninguém me disse que sonegar imposto é tão bom só penso em retirar dinheiro do governo todo dia toda noite',
    likesCount: 15,
    user: {
      name: 'Tim Maia da Sonegação',
      unique_key: 'MaiaOfTim',
      userProfile: {
        profile_picture_id: 'user1.png',
      },
    },
  },
  {
    id: 2,
    text: 'Video jogos digitais\n' + 'top 10 video jogos digitais\n' + 'top 10: gaucho simulator',
    likesCount: 25,
    user: {
      name: 'New Araçá City',
      unique_key: 'NovaAraca',
      userProfile: {
        profile_picture_id: 'user2.png',
      },
    },
  },
];

export default function Feed() {
  const { t } = useTranslation();

  const renderHeader = () => {
    return (
      <View style={styles.feedPage}>
        {posts.map((post, idx) => {
          return <Post key={`${post.id}-${idx}`} post={post} />;
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <View style={styles.view}>{renderHeader()}</View>
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
