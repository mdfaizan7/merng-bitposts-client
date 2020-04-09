import React, { useContext, useState } from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const Title = styled.h1`
  display: block;
  text-align: center;
  width: 100%;
  font-size: 2rem;
  margin-top: 10px !important;
  margin-bottom: 50px;
`;

const Register = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    userName: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(proxy, result) {
      context.login(result.data.login);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <Grid columns="equal">
      <Grid.Column />
      <Grid.Column>
        <div>
          <Form onSubmit={onSubmit} noValidate>
            <Title>Register</Title>
            <Form.Input
              type="text"
              label="Username"
              name="userName"
              value={values.userName}
              onChange={onChange}
              error={errors.userName ? true : false}
              placeholder="Username..."
            />
            <Form.Input
              type="email"
              label="Email"
              name="email"
              value={values.email}
              onChange={onChange}
              error={errors.email ? true : false}
              placeholder="Email..."
            />
            <Form.Input
              type="password"
              label="Password"
              name="password"
              value={values.password}
              onChange={onChange}
              error={errors.password ? true : false}
              placeholder="Password..."
            />
            <Form.Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
              error={errors.password ? true : false}
              placeholder="Confirm Password..."
            />
            <Button className={loading ? "loading" : ""} type="submit" primary>
              Register
            </Button>
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Grid.Column>
      <Grid.Column />
    </Grid>
  );
};

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      createdAt
      userName
      token
    }
  }
`;

export default Register;
