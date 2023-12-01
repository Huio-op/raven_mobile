import { router, useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PostApi from '../../service/api/PostApi';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../constants';
import Post from '../../components/posts/Post';
import IconButton from '../../components/IconButton';

export default function FullPost() {
  const { user } = useAuth();
  const { postId } = useLocalSearchParams();
  const [postInfo, setPostInfo] = useState(null);

  const fetchPostInfo = async () => {
    try {
      const fetchedPost = await PostApi.fetchPostInfo({
        postId,
        userId: user.userId,
        token: user.token,
      });
      setPostInfo(fetchedPost);
    } catch (e) {
      console.error('Error on function fetchPostInfo()', e);
    }
  };

  useEffect(() => {
    fetchPostInfo();
  }, []);

  return <View style={styles.container}>{postInfo && <Post post={postInfo} />}</View>;
}

const styles = new StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
