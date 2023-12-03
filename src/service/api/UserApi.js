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
  async getUser({ userId, token }) {
    const { data } = await HttpClient.get(`api/user/${userId}`, {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
  async login({ email, password }) {
    const { data } = await HttpClient.post('/login', { email, password });
    return data;
  },
};
