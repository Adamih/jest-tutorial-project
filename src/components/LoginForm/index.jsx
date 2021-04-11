import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@material-ui/core";
import "./style.css";

const LoginForm = ({ loginCallback }) => {
  const [email, setEmail] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [password, setPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrorCallback = () => setEmailValidationError(true);
    if (!validateEmail(email, validationErrorCallback)) return;

    await loginCallback(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="login-form"
      data-testid="login-form"
    >
      <TextField
        error={!!emailValidationError}
        helperText={
          !!emailValidationError &&
          "Please enter a valid email address. Example: example@mail.dk"
        }
        color="secondary"
        label="Email"
        variant="filled"
        className="login-field"
        data-testid="login-email-field"
        value={email}
        onInput={(e) => setEmail(e.target.value)}
      ></TextField>
      <TextField
        color="secondary"
        label="Password"
        type="password"
        variant="filled"
        className="login-field"
        data-testid="login-password-field"
        onInput={(e) => setPassword(e.target.value)}
      ></TextField>
      <Button
        type="submit"
        variant="contained"
        data-testid="login-submit-button"
        color="secondary"
      >
        Submit
      </Button>
    </form>
  );
};

const validateEmail = (email, validationErrorCallback) => {
  const match = email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
  if (!match) validationErrorCallback();
  return match ? true : false;
};

LoginForm.propTypes = {
  loginCallback: PropTypes.func,
};

export default LoginForm;
