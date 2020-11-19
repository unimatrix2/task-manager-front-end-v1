import React from 'react';
import axios from 'axios';
import * as yup from 'yup';

import { Formik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';

const schema = yup.object({
  email: yup.string()
    .email('Formato Inválido').min(5, 'Mínimo de 5 caracteres').max(100, 'Máximo de 100 caracteres').required('Campo Obrigatório'),
  password: yup.string()
    .min(5, 'Mínimo de 5 caracteres').max(100, 'Máximo de 100 caracteres').required('Campo Obrigatório'),
});

const Login = (props) => {
  const initialState = {
    email: '',
    password: '',
  }

  const redirectToLoggedArea = () => {
    props.history.push('/projects');
  }

  const handleSubmitMethod = async (formValues, helperMethods) => {
    try {
      console.log(formValues);
      // await axios.post(
      //   `${process.env.REACT_APP_API_BASE_URL}/auth/public/login`,
      //   formValues,
      // );

      // redirectToLoggedArea();
    } catch (error) {
      // if (error.response.data && error.response.data.type === 'Auth-Signup') {
      //   helperMethods.setFieldError('email', error.response.data.message);
      // }
    }
  }

  return (
    <main>
      <h1>Enter your credentials to start managing your projects :-)</h1>

      <Formik
        initialValues={initialState}
        onSubmit={handleSubmitMethod}
        validationSchema={schema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback>Okay!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback>Okay!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Login!</Button>

          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Login;