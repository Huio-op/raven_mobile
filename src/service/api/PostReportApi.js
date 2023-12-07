import HttpClient from '/service/HttpClient';

export default {
  async reportPost({ postId, userId, token }) {
    const { data } = await HttpClient.post(
      '/api/post/report',
      {
        userId: userId,
        postId: postId,
      },
      { headers: { token: `${token}/${userId}` } }
    );
    return data;
  },
  async fetchAll({ userId, token }) {
    const { data } = await HttpClient.get('/api/post/report', {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
};
