import HttpClient from '/service/HttpClient';

export default {
  async createUser({ email, password, userName }) {
    const { data } = await HttpClient.post('api/user', { email, password, name: userName });
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
