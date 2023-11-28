import HttpClient from '/service/HttpClient';

export default {
  async createPost({ content, userId, token }) {
    const { data } = await HttpClient.post(
      '/api/post',
      {
        content,
        ownerId: userId,
      },
      { headers: { token: `${token}/${userId}` } }
    );
    return data;
  },
  async fetchAll({ userId, token }) {
    const { data } = await HttpClient.get('/api/post', {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
};
