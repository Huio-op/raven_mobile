import HttpClient from '../HttpClient';

export default {
  async fetchForUser({ userId, token }) {
    const { data } = await HttpClient.get(`/api/notification/${userId}`, {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
};
