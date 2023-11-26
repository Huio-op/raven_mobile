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
  async getUser(id) {
    const { data } = await HttpClient.post(`api/user/${id}`);
    return data;
  },
  async login({ email, password }) {
    const { data } = await HttpClient.post('api/user/login', { email, password });
    return data;
  },
};
