import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

function Register(props) {
  const context = useContext(AuthContext);
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const [errors, setErrors] = useState(initialState);
  const { onSubmit, onChange, values } = useForm(registerUser, initialState);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      // Sets errors recieved from the server
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <div>
          <Form.Input
            className="input-field"
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={values.username}
            onChange={onChange}
            error={errors.username ? true : false}
          />
          <span style={{ color: "#a44544" }}>{errors.username}</span>
        </div>
        <div>
          <Form.Input
            className="input-field"
            label="Email"
            placeholder="Email.."
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            error={errors.email ? true : false}
          />
          <span style={{ color: "#a44544" }}>{errors.email}</span>
        </div>
        <div>
          <Form.Input
            className="input-field"
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
            error={errors.password ? true : false}
          />
          <span style={{ color: "#a44544" }}>{errors.password}</span>
        </div>
        <div>
          <Form.Input
            className="input-field"
            label="Confirm Password"
            placeholder="Confirm Password.."
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={onChange}
            error={errors.confirmPassword ? true : false}
          />
          <span style={{ color: "#a44544" }}>{errors.confirmPassword}</span>
        </div>
        <Button className="submit-button" type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
