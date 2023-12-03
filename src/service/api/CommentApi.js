import HttpClient from '/service/HttpClient';

export default {
  async createPost({ content, originalPostId, userId, token }) {
    const { data } = await HttpClient.post(
      '/api/comment',
      {
        content,
        ownerId: userId,
        originalPostId,
      },
      { headers: { token: `${token}/${userId}` } }
    );
    return data;
  },
};
