import HttpClient from '/service/HttpClient';

export default {
  async createPost({ content, originalPostId, userId, token, parentCommentId }) {
    const { data } = await HttpClient.post(
      '/api/post/comment',
      {
        content,
        ownerId: userId,
        originalPostId,
        parentCommentId,
      },
      { headers: { token: `${token}/${userId}` } }
    );
    return data;
  },
  async findCommentsForPost({ postId, token, userId }) {
    const { data } = await HttpClient.get(`/api/post/comment/${postId}`, {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
};
