import HttpClient from '/service/HttpClient';

export default {
  async createUser({ email, password, userName }) {
    const { data } = await HttpClient.post('api/user', { email, password, name: userName });
    console.log(data);
    return data;
  },
  async getUser(id) {
    const { data } = await HttpClient.post(`api/user/${id}`);
    console.log(data);
    return data;
  },
};
