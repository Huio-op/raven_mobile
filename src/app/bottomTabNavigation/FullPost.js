import { router, useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import PostApi from '../../service/api/PostApi';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../constants';
import Post from '../../components/posts/Post';
import CommentApi from '../../service/api/CommentApi';

export default function FullPost() {
  const { user } = useAuth();
  const { postId, refresh } = useLocalSearchParams();
  const [postInfo, setPostInfo] = useState(null);
  const [comments, setComments] = useState([]);

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

  const fetchPostComments = async () => {
    try {
      const fetchedComments = await CommentApi.findCommentsForPost({
        postId,
        userId: user.userId,
        token: user.token,
      });
      setComments(fetchedComments);
    } catch (e) {
      console.error('Error on function fetchPostComments()', e);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPostInfo();
      await fetchPostComments();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await fetchPostInfo();
      await fetchPostComments();
    })();
  }, [refresh]);

  const postComments = comments.filter((c) => !c.parentCommentId);

  const returnCommentComment = (commentForChild) => {
    const commentComments = comments.filter((c) => c.parentCommentId === commentForChild.id);

    return commentComments.map((commentComment, idx) => {
      const hasChild = comments.find((c) => c.parentCommentId === commentComment.id);

      return (
        <View key={`comment-${commentComment}-${idx}`}>
          <Post
            key={`comment-${commentForChild.id}`}
            post={commentComment}
            isComment={true}
            originalPostId={commentComment.originalPostId}
            withChild={hasChild}
          />
          {hasChild && returnCommentComment(commentComment)}
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      {postInfo && (
        <View style={{ backgroundColor: COLORS['light-grey'], gap: 5, borderRadius: 30 }}>
          <Post post={postInfo} fullPost={true} />
          {postComments.map((comment, idx) => {
            const hasChild = comments.find((c) => c.parentCommentId === comment.id);

            return (
              <View key={`comment-${comment.id}`}>
                <Post
                  post={comment}
                  isComment={true}
                  originalPostId={comment.originalPostId}
                  withChild={hasChild}
                />
                {hasChild && returnCommentComment(comment)}
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = new StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 50,
  },
});
