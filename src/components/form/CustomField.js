import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { useFormCtx } from '/hooks/useFormCtx';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '/constants';
import _get from 'lodash/get';
import Input from '/components/form/Input';

const buildSchemaPath = (fullPath) => {
  const splitPaths = fullPath.split('.');
  let path = splitPaths.shift();
  splitPaths.forEach((pathStep) => {
    if (pathStep.startsWith('[')) {
      path += '.innerType';
    } else {
      path += '.fields';
      path += `.${pathStep}`;
    }
  });
  return path;
};

export default function CustomField({
  label = null,
  inputComponent = Input,
  showErrors = true,
  children,
  rootStyle = {},
  labelStyle = {},
  asProps = {},
  ...props
}) {
  const formikCtx = useFormikContext();
  const { t, i18n } = useTranslation();
  const { validationSchema } = useFormCtx() ?? {};

  const InputComponent = inputComponent;
  const fieldName = _get(props, 'field.name', props.name);
  const generateErrorMessage = (formikCtx) => {
    let errorMessage = _get(formikCtx.errors, fieldName);
    if (i18n.exists(`errors.${errorMessage}`)) {
      errorMessage = t(`errors.${errorMessage}`);
    } else if (i18n.exists(`${errorMessage}`)) {
      errorMessage = t(`${errorMessage}`);
    }
    return errorMessage;
  };

  const onChangeField = (value) => {
    console.log('vavavavavavavava', value);
    formikCtx.setFieldValue(fieldName, value);
  };

  const showErrorContainer = !!fieldName && !props.disabled && showErrors;
  const errorMessage = generateErrorMessage(formikCtx);
  const showErrorMessage = showErrorContainer && errorMessage && formikCtx.submitCount > 0;

  const fieldSchema = fieldName ? _get(validationSchema?.fields, buildSchemaPath(fieldName)) : null;
  const isRequired = !!fieldSchema?.exclusiveTests?.required;

  console.log('asudasduisbauidasdas', showErrorContainer);
  return (
    <View style={[styles.fieldComponent, rootStyle]}>
      <Text style={[styles.label, labelStyle]}>
        {label}
        {isRequired ? '*' : ''}
      </Text>
      <View style={styles.fieldWrapper}>
        <InputComponent onChangeText={onChangeField} {...props} {...asProps} />
        {showErrorContainer && <Text style={styles.errorMsg}>{errorMessage}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldComponent: {
    color: COLORS.cream,
    flex: 1,
    flexDirection: 'column',
    fontSize: 16,
    gap: 8,
  },
  errorMessage: {
    color: COLORS['light-red'],
  },
  fieldError: {
    color: COLORS['light-red'],
  },
  fieldDisabled: {
    opacity: 0.5,
  },
  errorMsg: {
    color: COLORS.red,
  },
});
