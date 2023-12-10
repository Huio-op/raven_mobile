import HttpClient from '/service/HttpClient';
import { parseInt } from 'lodash';

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
  async userFollow({ userToFollow, userId, token }) {
    const { data } = await HttpClient.post(
      `/api/user/${userId}/follow`,
      { userId: parseInt(userToFollow) },
      { headers: { token: `${token}/${userId}` } }
    );
    return data;
  },
  async followingUsers({ userToSearch, userId, token }) {
    const { data } = await HttpClient.get(`/api/user/${userToSearch}/following`, {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
  async folloedByUsers({ userToSearch, userId, token }) {
    const { data } = await HttpClient.get(`/api/user/${userToSearch}/followedBy`, {
      headers: { token: `${token}/${userId}` },
    });
    return data;
  },
  async isFollowingUser({ userToSearch, userId, token }) {
    const { data } = await HttpClient.post(
      `/api/user/${userId}/isFollowing`,
      { userId: parseInt(userToSearch) },
      { headers: { token: `${token}/${userId}` } }
    );
    return data;
  },
};
