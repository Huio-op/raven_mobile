import HttpClient from '/service/HttpClient';

export default {
  async createUser({ email, password, userName, uniqueKey, birthDate }) {
    const { data } = await HttpClient.post('/register', {
      email,
      password,
      name: userName,
      uniqueKey,
      birthDate,
    });
    return data;
  },
  async getUser({ profileUserId, userId, token }) {
    const { data } = await HttpClient.get(`api/user/${profileUserId}`, {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
  async login({ email, password }) {
    const { data } = await HttpClient.post('/login', { email, password });
    return data;
  },
  async saveUser({ values, userId, token }) {
    const { data } = await HttpClient.put(`api/user/${userId}`, values, {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
};
