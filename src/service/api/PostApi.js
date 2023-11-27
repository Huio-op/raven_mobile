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
};
