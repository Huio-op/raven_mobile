import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, FONTS, images } from '/constants';
import IconButton from '/components/IconButton';
import { FormWrapper } from '/hooks/useFormCtx';
import CustomField from '/components/form/CustomField';
import CustomButton, { BUTTON_TYPES } from '/components/CustomButton';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import yup from '/service/yup';
import UserApi from '/service/api/UserApi';

const LoginSchema = yup.object().shape({
  email: yup.string().default('').email().required(),
  password: yup.string().default('').required(),
});

const ERRORS = {
  NOT_FOUND: {
    key: 'userNotFound',
  },
};

export default function Login() {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  const backToWelcome = () => {
    router.replace('/');
  };

  const doLogin = async (values) => {
    try {
      const user = await UserApi.login(values);
      setError(null);
      router.replace('/bottomTabNavigation/Feed');
      // UiMsg.ok('Usuário criado com sucesso!');
    } catch (e) {
      const status = e.response.status;
      if (status === 404) {
        setError(ERRORS.NOT_FOUND);
      } else {
        console.error('Error on function doLogin()', { ...e });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <View style={styles.pageWrapper}>
          <View style={styles.backWrapper}>
            <IconButton onPress={backToWelcome} />
          </View>
          <Image source={images.raven_icon} resizeMode={'contain'} style={styles.ravenIcon} />
          <Text style={styles.title}>{t('login.title')}</Text>
          <View style={styles.formContainer}>
            <FormWrapper
              validationSchema={LoginSchema}
              initialValues={LoginSchema.default()}
              onSubmit={doLogin}
              validateOnChange={false}
            >
              {({ submitForm, errors, values, ...props }) => {
                return (
                  <ScrollView
                    style={styles.formWrapper}
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{ alignItems: 'center' }}
                  >
                    <View style={styles.loginForm}>
                      {error ? (
                        <Text style={[styles.errorText]}>{t(`login.errors.${error.key}`)}</Text>
                      ) : (
                        <></>
                      )}
                      <CustomField
                        label={t('form.email')}
                        labelStyle={styles.whiteLabel}
                        rootStyle={styles.field}
                        name={'email'}
                        removeClippedSubviews={false}
                      />
                      <CustomField
                        label={t('form.password')}
                        labelStyle={styles.whiteLabel}
                        rootStyle={styles.field}
                        name={'password'}
                        secureTextEntry={true}
                      />
                      <CustomButton
                        title={t('login.enter')}
                        type={BUTTON_TYPES.SECONDARY}
                        customStyles={styles.confirmButton}
                        onPress={submitForm}
                      />
                    </View>
                  </ScrollView>
                );
              }}
            </FormWrapper>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  flex: {
    flex: 1,
  },
  formWrapper: {
    width: '100%',
  },
  scroll: {
    flex: 1,
  },
  pageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  ravenIcon: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 80,
  },
  formContainer: {
    backgroundColor: COLORS.purple,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: 500,
  },
  whiteLabel: {
    color: COLORS.white,
  },
  title: {
    ...FONTS.h1,
    fontSize: 40,
    lineHeight: 40,
    color: COLORS.purple,
    marginBottom: 20,
  },
  loginForm: {
    marginTop: 40,
    color: COLORS.cream,
    width: '80%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    gap: 25,
  },
  field: {
    width: '100%',
  },
  confirmButton: {
    backgroundColor: COLORS.orange,
    width: '100%',
    marginBottom: 40,
  },
  backWrapper: {
    position: 'absolute',
    top: 60,
    left: 20,
    height: 50,
  },
  errorText: {
    ...FONTS.h3,
    color: COLORS.red,
  },
});
