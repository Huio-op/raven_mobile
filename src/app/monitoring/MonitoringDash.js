import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Post from '../../components/posts/Post';
import React, { useEffect, useState } from 'react';
import { COLORS, COMPONENTS, FONTS } from '../../constants';
import FeatherButton from '../../components/FeatherButton';
import PostApi from '../../service/api/PostApi';
import { useAuth } from '../../hooks/useAuth';
import PostReportApi from '../../service/api/PostReportApi';

export default function MonitoringDash() {
  const [reports, setReports] = useState([]);

  const deletePost = async (postId) => {
    try {
      PostApi.delete({ postId, userId: 1, token: 'monitoring_token' });
    } catch (e) {
      console.error('Error on funtion deletePost()', e);
    }
  };

  const fetchReported = async () => {
    try {
      const fetchedReports = await PostReportApi.fetchAll({
        userId: 1,
        token: 'monitoring_token',
      });
      setReports(fetchedReports);
    } catch (e) {
      console.error('Error on function fetchReported()', e);
    }
  };

  useEffect(() => {
    fetchReported();
  }, []);

  const acceptPost = async (postId) => {};

  return (
    <ScrollView contentContainerStyle={styles.feedPage}>
      {reports.map((report, idx) => {
        const post = report.post;
        return (
          <View style={styles.postWrapper} key={idx}>
            <View style={styles.postContainer}>
              <Post key={`${post.id}-${idx}`} post={post} withInteractions={false} />
            </View>
            <View style={styles.reportUser}>
              <View style={styles.reportCount}>
                <Text style={{ fontWeight: 'bold' }}>Reportado por:</Text>
                <Text>{report.user.uniqueKey}</Text>
              </View>
              <Text>{report.user.email}</Text>
            </View>

            <View style={styles.buttonsWrapper}>
              <FeatherButton
                icon={'delete'}
                customStyles={styles.deleteButton}
                onPress={() => deletePost(post.id)}
              />
              <FeatherButton
                icon={'check'}
                customStyles={styles.checkButton}
                onPress={() => acceptPost(post.id)}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    ...COMPONENTS.androidSafeArea,
    flex: 1,
    backgroundColor: '#FFF',
  },
  view: {
    flex: 1,
    paddingHorizontal: 22,
  },
  feedPage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    gap: 10,
    marginBottom: 50,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    height: '100%',
  },
  profileWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileOpacity: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#18274B',
    shadowOffset: {
      width: 0,
      height: 4.5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6.5,
    elevation: 2,
    borderRadius: 22,
  },
  tabText: {
    ...FONTS.h2,
  },
  postWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 20,
  },
  buttonsWrapper: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
  },
  checkButton: {
    backgroundColor: '#008000',
  },
  reportUser: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  reportCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  postContainer: {
    width: 700,
  },
});
