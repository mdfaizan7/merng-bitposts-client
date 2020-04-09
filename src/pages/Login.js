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

const Login = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    userName: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(proxy, result) {
      context.login(result.data.login);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Grid columns="equal">
      <Grid.Column />
      <Grid.Column>
        <div>
          <Form onSubmit={onSubmit} noValidate>
            <Title>Login</Title>
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
              type="password"
              label="Password"
              name="password"
              value={values.password}
              onChange={onChange}
              error={errors.password ? true : false}
              placeholder="Password..."
            />
            <Button className={loading ? "loading" : ""} type="submit" primary>
              Login{" "}
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

const LOGIN_USER_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      createdAt
      userName
      token
    }
  }
`;

export default Login;
