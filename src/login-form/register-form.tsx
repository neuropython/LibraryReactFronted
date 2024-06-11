import { Formik, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './login-form-style.css';
import * as yup from 'yup';
import React, { useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { name } from 'tar/dist/commonjs/types';
import { useTranslation } from 'react-i18next';

interface FormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export function RegisterForm() {
  const [t, i18n] = useTranslation('global');
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
  const history = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <div className="loginWrapper">
      <div>
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            name: '',
            role: 'ROLE_READER',
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            axios
              .post('http://localhost:8080/api/auth/register', values, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                localStorage.setItem('token', response.data.token);
                setSubmitting(false);
                console.log(response.data);
                history('/');
              })
              .catch((error) => {
                // handle error here
                console.error(error);
                setSubmitting(false);
              });
          }}
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
                label={t('login')}
                variant="standard"
                onBlur={formik.handleBlur}
                helperText={<ErrorMessage name="username" />}
                error={Boolean(
                  formik.errors.username && formik.touched.username,
                )}
              />
              <Field
                name="password"
                type="password"
                as={TextField}
                label={t('password')}
                variant="standard"
                onBlur={formik.handleBlur}
                helperText={<ErrorMessage name="password" />}
                error={Boolean(
                  formik.errors.password && formik.touched.password,
                )}
              />
              <Field
                name="email"
                type="email"
                as={TextField}
                label={t('email')}
                variant="standard"
                onBlur={formik.handleBlur}
                helperText={<ErrorMessage name="email" />}
                error={Boolean(formik.errors.email && formik.touched.email)}
              />
              <Field
                name="name"
                type="text"
                as={TextField}
                label={t('name')}
                variant="standard"
                onBlur={formik.handleBlur}
                helperText={<ErrorMessage name="name" />}
                error={Boolean(formik.errors.name && formik.touched.name)}
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
                {t('register')}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
