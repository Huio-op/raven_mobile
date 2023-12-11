import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import React, { useState } from 'react';
import SearchField from '../../components/form/SearchField';
import SearchApi from '../../service/api/SearchApi';
import { useAuth } from '../../hooks/useAuth';
import Post from '../../components/posts/Post';
import ProfileLink from '../../components/profile/ProfileLink';
import UiBlocker from '../../components/UiBlocker';

export default function Search() {
  const { user } = useAuth();
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const doSearch = async (searchTerm) => {
    try {
      setLoading(true);
      const result = await SearchApi.doSearch({
        searchTerm,
        userId: user.userId,
        token: user.token,
      });

      setSearchResult(result);
    } catch (e) {
      console.error('Error on function doSearch()', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchField onSearch={doSearch} />
      <UiBlocker block={loading}>
        {searchResult && (
          <>
            <View
              style={{
                height: 125,
              }}
            >
              <ScrollView style={styles.userScroll} horizontal={true}>
                {searchResult.users.map((user, idx) => {
                  return <ProfileLink key={`userProfile-${user.id}-${idx}`} user={user} />;
                })}
              </ScrollView>
            </View>
            <ScrollView style={styles.postScroll}>
              {searchResult.posts.map((post, idx) => {
                return (
                  <Post
                    key={`post-${post.id}-${idx}`}
                    post={post}
                    customStyle={{ marginBottom: 5 }}
                  />
                );
              })}
            </ScrollView>
          </>
        )}
      </UiBlocker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    gap: 10,
  },
  tabText: {
    ...FONTS.h2,
  },
  userScroll: {
    flexDirection: 'row',
    gap: 5,
  },
  postScroll: {
    gap: 5,
    marginBottom: 50,
  },
});
