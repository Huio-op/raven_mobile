import { createContext, useContext } from 'react';
import { Formik } from 'formik';
import yup from '/service/yup';

const FormCtx = createContext({ validationSchema: yup.object() });

export function useFormCtx() {
  return useContext(FormCtx);
}

export function FormWrapper({
  validationSchema,
  children,
  initialValues,
  onSubmit,
  ...formikProps
}) {
  const contextValue = {
    validationSchema,
  };

  return (
    <FormCtx.Provider value={contextValue}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        {...formikProps}
      >
        {children}
      </Formik>
    </FormCtx.Provider>
  );
}
