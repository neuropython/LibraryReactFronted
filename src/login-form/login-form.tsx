import { Formik, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './login-form.css';
import * as yup from 'yup';
import React, { useMemo } from 'react';

interface FormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

function LoginForm() {
  const initialValues: FormValues = {
    username: '',
    password: '',
    rememberMe: false,
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        password: yup
          .string()
          .required('Required')
          .matches(/\d/, 'Add number')
          .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Add special character')
          .matches(/[a-zA-Z]/, 'Add char'),
        username: yup.string().required('Required'),
      }),
    [],
  );

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnChange
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form
            className="signInform"
            id="signInform"
            onSubmit={formik.handleSubmit}
          >
            <Field
              name="username"
              type="text"
              as={TextField}
              label="Login"
              variant="standard"
              onBlur={formik.handleBlur}
              helperText={<ErrorMessage name="username" />}
              error={Boolean(formik.errors.username && formik.touched.username)}
            />
            <Field
              name="password"
              type="password"
              as={TextField}
              label="Password"
              variant="standard"
              onBlur={formik.handleBlur}
              helperText={<ErrorMessage name="password" />}
              error={Boolean(formik.errors.password && formik.touched.password)}
            />
            <Field
              name="rememberMe"
              type="checkbox"
              id="CheckBox"
              label="Remember me?"
            />

            <Button
              variant="contained"
              endIcon={<LoginIcon />}
              type="submit"
              form="signInform"
              disabled={
                !formik.isValid ||
                !formik.touched.password ||
                !formik.touched.username
              }
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
