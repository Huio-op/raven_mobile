import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../constants';
import Notification from '../../components/notifiactions/Notification';
import NotificationApi from '../../service/api/NotificationApi';
import { useAuth } from '../../hooks/useAuth';
import UiBlocker from '../../components/UiBlocker';

export default function Notifications() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      fetchPosts();
    } finally {
      setRefreshing(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await NotificationApi.fetchForUser({
        userId: user.userId,
        token: user.token,
      });

      setNotifications(
        response.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    } catch (e) {
      console.error('Error on function fetchNotifications()', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  console.log('asidasyibdasdas', layout);
  return (
    <View style={[styles.container]}>
      <UiBlocker block={loading}>
        {notifications.length === 0 && (
          <Text
            style={{
              ...FONTS.h3,
              textAlignVertical: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            Sem notificações...
          </Text>
        )}
        {notifications.length > 0 && (
          <FlatList
            onLayout={(event) => setLayout(event.nativeEvent.layout)}
            data={notifications}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            style={{ width: '100%' }}
            numColumns={1}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 50,
              width: '100%',
              gap: 10,
            }}
            renderItem={({ item, idx }) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: layout.width,
                  }}
                >
                  <Notification notification={item} />
                </View>
              );
            }}
          />
        )}
      </UiBlocker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  tabText: {
    ...FONTS.h2,
  },
});
