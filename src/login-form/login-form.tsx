import { Formik, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './login-form-style.css';
import * as yup from 'yup';
import React, { useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export function LoginForm() {
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

  return (
    <div className="loginWrapper">
      <div>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post('http://localhost:8080/api/auth/register', values)
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
                label="Login"
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
                label="Password"
                variant="standard"
                onBlur={formik.handleBlur}
                helperText={<ErrorMessage name="password" />}
                error={Boolean(
                  formik.errors.password && formik.touched.password,
                )}
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
    </div>
  );
}

export default LoginForm;
