import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import IconButton from '../IconButton';
import React from 'react';
import CustomButton from '../CustomButton';
import { useTranslation } from 'react-i18next';
import { FormWrapper } from '../../hooks/useFormCtx';
import yup from '../../service/yup';
import { COLORS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import PostApi from '../../service/api/PostApi';
import { router } from 'expo-router';
import CommentApi from '../../service/api/CommentApi';

const PostSchema = yup.object().shape({
  content: yup.string().min(1).default(''),
});

export default function WritePostModal({ handleClose, postId = null }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const createPost = async ({ content }) => {
    try {
      if (postId) {
        const comment = await CommentApi.createComment({
          content,
          userId: user.userId,
          token: user.token,
          originalPostId: postId,
        });
        router.replace(`/bottomTabNavigation/FullPost?postId=${postId}`);
      } else {
        const post = await PostApi.createPost({ content, userId: user.userId, token: user.token });
        router.replace('/bottomTabNavigation/Feed');
      }
      handleClose();
    } catch (e) {
      console.error('Error on function createPost()', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormWrapper
        validationSchema={PostSchema}
        initialValues={PostSchema.default()}
        onSubmit={createPost}
        validateOnChange={false}
      >
        {({ submitForm, errors, values, setFieldValue, ...props }) => {
          return (
            <>
              <View style={styles.postHeader}>
                <View style={styles.backWrapper}>
                  <IconButton onPress={handleClose} />
                </View>
                <CustomButton
                  title={t('post.post')}
                  customStyles={styles.postButton}
                  onPress={async () => {
                    await submitForm();
                  }}
                />
              </View>
              <View style={styles.contentWrapper}>
                <TextInput
                  style={styles.contentInput}
                  placeholder={t('post.placeholder')}
                  multiline={true}
                  autoFocus={true}
                  onChangeText={(text) => {
                    setFieldValue('content', text);
                  }}
                />
              </View>
            </>
          );
        }}
      </FormWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.cream,
  },
  postHeader: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backWrapper: {
    left: 20,
    height: 50,
    width: 50,
  },
  postButton: {
    marginRight: 20,
    width: 80,
  },
  contentWrapper: {
    marginHorizontal: 25,
  },
  contentInput: {
    height: 200,
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: COLORS['light-grey'],
  },
});
