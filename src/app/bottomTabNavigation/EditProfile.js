import { ScrollView, View, StyleSheet, Text, Image, TextInput } from 'react-native';
import { FormWrapper } from '../../hooks/useFormCtx';
import yup from '../../service/yup';
import { COLORS, FONTS, images } from '../../constants';
import CustomField from '../../components/form/CustomField';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputWithPrefix from '../../components/form/InputWithPrefix';
import DateUtils from '../../utils/DateUtils';
import Avatar from '../../components/profile/Avatar';
import PopupMenu from '../../components/posts/PopupMenu';
import * as ImagePicker from 'expo-image-picker';
import Banner from '../../components/profile/Banner';
import { router, useLocalSearchParams } from 'expo-router';
import UserApi from '../../service/api/UserApi';
import { useAuth } from '../../hooks/useAuth';
import CustomButton, { BUTTON_TYPES } from '../../components/CustomButton';

const ProfileSchema = yup.object().shape({
  name: yup.string().default('').required(),
  uniqueKey: yup.string().required(),
  birthDate: yup.date().required().default(new Date()),
  userProfile: yup.object().shape({
    backgroundColor: yup.string().default('#ffffff'),
    bio: yup.string().default(''),
    primaryColor: yup.string().default('#ffffff'),
    bannerId: yup.string().default('').nullable(),
    profilePictureId: yup.string().default('').nullable(),
    secondaryColor: yup.string().default('#f6f6f6'),
  }),
});

export default function EditProfile() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bannerImage, setBannerImage] = useState(images.post2);
  const [avatarImage, setAvatarImage] = useState(images.user1);
  const [initialValues, setInitialValues] = useState(ProfileSchema.default());

  const toggleDatePicker = (show) => {
    setShowDatePicker(show);
  };

  const fetchUserInfo = async () => {
    try {
      const fetchedUser = await UserApi.getUser({
        profileUserId: user.userId,
        userId: user.userId,
        token: user.token,
      });
      setInitialValues({ ...ProfileSchema.default(), ...fetchedUser });
    } catch (e) {
      console.error('Error on function fetchUserInfo()', e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchUserInfo();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return;
  }

  const imageOptions = (isAvatar) => [
    {
      title: 'profile.camera',
      icon: 'camera',
      action: async () => {
        await uploadImage(isAvatar);
      },
    },
    {
      title: 'profile.gallery',
      icon: 'image',
      action: async () => {
        await uploadImage(isAvatar, 'gallery');
      },
    },
  ];

  const uploadImage = async (isAvatar, mode) => {
    try {
      let result = {};
      if (mode === 'gallery') {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        await saveImage(result.assets[0].uri, isAvatar);
      }
    } catch (e) {
      console.error('Error on function uploadImage()', e);
    }
  };

  const saveImage = async (image, isAvatar) => {
    try {
      if (isAvatar) {
        setAvatarImage(image);
      } else {
        setBannerImage(image);
      }
    } catch (e) {
      console.error('Error on function saveImage()', e);
    }
  };

  const saveNewProfile = async (values) => {
    try {
      delete values.userProfile;
      const savedUser = await UserApi.saveUser({
        values: {
          name: values.name,
          uniqueKey: values.uniqueKey,
          birthDate: values.birthDate,
        },
        userId: user.userId,
        token: user.token,
      });
      router.replace(`/bottomTabNavigation/Profile`);
    } catch (e) {
      console.error('Error on function saveNewProfile()', e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FormWrapper
        validationSchema={ProfileSchema}
        initialValues={initialValues}
        onSubmit={saveNewProfile}
        validateOnChange={false}
        enableReinitialize={true}
      >
        {({ values, submitForm, errors }) => {
          const avatarOpts = imageOptions(true);
          const bannerOpts = imageOptions(false);
          return (
            <ScrollView
              style={{ flex: 1 }}
              automaticallyAdjustKeyboardInsets={true}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              <View style={styles.editProfileForm}>
                <Text style={styles.title}>{t('profile.banner')}</Text>
                <View
                  style={{ width: '100%', overflow: 'hidden', borderRadius: 30, marginBottom: 15 }}
                >
                  <Banner image={bannerImage} />
                  <PopupMenu
                    options={bannerOpts}
                    customStyles={styles.editBanner}
                    icon={'edit'}
                    iconSize={18}
                  />
                </View>
                <Text style={styles.title}>{t('profile.profilePicture')}</Text>
                <View>
                  <Avatar image={avatarImage} />
                  <PopupMenu
                    options={avatarOpts}
                    customStyles={styles.editAvatar}
                    icon={'edit'}
                    iconSize={18}
                  />
                </View>
                <CustomField
                  label={t('form.userName')}
                  rootStyle={styles.field}
                  name={'name'}
                  value={values.name}
                />
                <CustomField
                  label={t('form.uniqueKey')}
                  labelStyle={styles.whiteLabel}
                  rootStyle={styles.field}
                  name={'uniqueKey'}
                  inputComponent={InputWithPrefix}
                  prefix={'@'}
                  value={values.uniqueKey}
                />
                <CustomField
                  name={'birthDate'}
                  label={t('form.birthDate')}
                  labelStyle={styles.whiteLabel}
                  rootStyle={styles.field}
                  disabled={true}
                  onPress={() => toggleDatePicker(true)}
                  value={DateUtils.formatDate(values.birthDate)}
                />
                {showDatePicker && (
                  <DateTimePicker
                    mode={'date'}
                    display={'spinner'}
                    value={values.birthDate}
                    onChange={onChangeDatePicker}
                  />
                )}
                <CustomField
                  label={t('profile.bio')}
                  rootStyle={[styles.field, styles.bioField]}
                  name={'userProfile.bio'}
                  multiline={true}
                  value={values.userProfile.bio || ''}
                />

                <CustomButton
                  title={t('form.save')}
                  type={BUTTON_TYPES.PRIMARY}
                  onPress={submitForm}
                  customStyles={{ marginBottom: 80 }}
                />
              </View>
            </ScrollView>
          );
        }}
      </FormWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  editProfileForm: {
    marginTop: 10,
    color: COLORS.white,
    width: '80%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  field: {
    width: '100%',
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userPfp: {
    height: 100,
    width: 100,
  },
  editAvatar: {
    position: 'absolute',
    top: 70,
    left: 0,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS['light-grey'],
    padding: 5,
  },
  editBanner: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS['light-grey'],
    padding: 5,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioField: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: COLORS['light-grey'],
    marginBottom: 10,
  },
  title: {
    ...FONTS.h2,
  },
});
