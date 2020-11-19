import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import { Formik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';

const schema = yup.object({
  fullName: yup.string()
    .min(5, 'Mínimo de 5 caracteres').max(100, 'Máximo de 100 caracteres').required('Campo Obrigatório'),
  email: yup.string()
    .email('Formato Inválido').min(5, 'Mínimo de 5 caracteres').max(100, 'Máximo de 100 caracteres').required('Campo Obrigatório'),
  password: yup.string()
    .min(5, 'Mínimo de 5 caracteres').max(100, 'Máximo de 100 caracteres').required('Campo Obrigatório'),
});

const Signup = (props) => {
  const [isSignupSuccesfull, setIsSignupSuccesfull] = useState(false);

  const initialState = {
    fullName: '',
    email: '',
    password: '',
  }

  const redirectToLogin = () => {
    setTimeout(() => {
      props.history.push('/');
    }, 2000);
  }

  const handleSubmitMethod = async (formValues, helperMethods) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/public/signup`,
        formValues,
      );

      setIsSignupSuccesfull(true);

      redirectToLogin();
    } catch (error) {
      if (error.response.data && error.response.data.type === 'Auth-Signup') {
        helperMethods.setFieldError('email', error.response.data.message);
      }
    }
  }

  return (
    <main>
      {isSignupSuccesfull && <h2>Cadastro realizado com sucesso. Redirecionando para o login...</h2>}

      <h1>Subscribe to our awesome Project manager App! :-)</h1>

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
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.fullName && !errors.fullName}
                isInvalid={touched.fullName && errors.fullName}
              />
              <Form.Control.Feedback>Okay!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
            </Form.Group>

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

            <Button type="submit">Signup!</Button>

          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Signup;
