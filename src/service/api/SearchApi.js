import HttpClient from '../HttpClient';

export default {
  async doSearch({ searchTerm, token, userId }) {
    const { data } = await HttpClient.get(`/api/search/${searchTerm}`, {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
};
