import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { COLORS, COMPONENTS, FONTS, images } from '/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomField from '/components/form/CustomField';
import { FormWrapper } from '/hooks/useFormCtx';
import { Form } from 'formik';
import yup from '/service/yup';
import CustomButton, { BUTTON_TYPES } from '/components/CustomButton';
import IconButton from '/components/IconButton';
import { router } from 'expo-router';
import Input from '../../components/form/Input';
import UiMsg from '/service/UiMsg';
import UserApi from '../../service/api/UserApi';

const CreateAccountSchema = yup.object().shape({
  email: yup.string().default('').email().required(),
  userName: yup.string().default('').required(),
  password: yup
    .string()
    .default('')
    .required()
    .min(3)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'formik.string.password'
    ),
  passwordConfirm: yup.string().default('').required().min(3),
});

export default function FirstStep() {
  const { t } = useTranslation();

  const backToWelcome = () => {
    router.replace('/');
  };

  const submitCreateScreen = async (values) => {
    try {
      console.log('erroeroere', values);
      await UserApi.createUser(values);
      // UiMsg.ok('Usuário criado com sucesso!');
    } catch (e) {
      console.error('Error on function submitCreateScreen()', { ...e });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView contentContainerStyle={styles.flex} automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.pageWrapper}>
            <View style={styles.backWrapper}>
              <IconButton onPress={backToWelcome} />
            </View>
            <Image source={images.raven_icon} resizeMode={'contain'} style={styles.ravenIcon} />
            <Text style={styles.title}>{t('createAccount.title')}</Text>
            <View style={styles.formContainer}>
              <FormWrapper
                validationSchema={CreateAccountSchema}
                initialValues={CreateAccountSchema.default()}
                onSubmit={submitCreateScreen}
                validateOnChange={false}
              >
                {({ submitForm, errors, values, ...props }) => {
                  return (
                    <ScrollView
                      style={styles.scroll}
                      automaticallyAdjustKeyboardInsets={true}
                      contentContainerStyle={{ alignItems: 'center' }}
                    >
                      <View style={styles.createAccountForm}>
                        <Text style={styles.formDesc}>{t('createAccount.fillTheForm')}</Text>
                        <CustomField
                          label={t('form.email')}
                          labelStyle={styles.whiteLabel}
                          rootStyle={styles.field}
                          name={'email'}
                          removeClippedSubviews={false}
                        />
                        <CustomField
                          label={t('form.userName')}
                          labelStyle={styles.whiteLabel}
                          rootStyle={styles.field}
                          name={'userName'}
                        />
                        <CustomField
                          label={t('form.password')}
                          labelStyle={styles.whiteLabel}
                          rootStyle={styles.field}
                          name={'password'}
                          secureTextEntry={true}
                        />
                        <CustomField
                          label={t('form.passwordConfirm')}
                          labelStyle={styles.whiteLabel}
                          rootStyle={styles.field}
                          name={'passwordConfirm'}
                          secureTextEntry={true}
                        />
                        <CustomButton
                          title={t('welcome.create')}
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
        </ScrollView>
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
    marginTop: 40,
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
  createAccountForm: {
    marginTop: 40,
    color: COLORS.cream,
    width: '80%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  formDesc: {
    ...FONTS.h3,
    color: COLORS.cream,
    width: '100%',
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
});
