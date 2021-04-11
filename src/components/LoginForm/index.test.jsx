import React from "react";

import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./index";
import { jest, afterEach, test, expect } from "@jest/globals";

afterEach(cleanup);

test("renders login form", () => {
  render(<LoginForm />);
  const linkElement = screen.getByTestId(/login-form/i);
  expect(linkElement).toBeInTheDocument();
});

test("test empty email login callback", () => {
  const stub = jest.fn().mockResolvedValue(true);
  render(<LoginForm loginCallback={stub} />);

  screen.getByTestId(/login-submit-button/i).click();

  expect(stub).not.toHaveBeenCalled();
});

test("test invalid email login callback", () => {
  const stub = jest.fn().mockResolvedValue(true);
  render(<LoginForm loginCallback={stub} />);

  const emailInput = screen
    .getByTestId(/login-email-field/i)
    .querySelector("input");
  userEvent.type(emailInput, "Hello, World!");
  expect(emailInput.value).toBe("Hello, World!");
  screen.getByTestId(/login-submit-button/i).click();

  expect(stub).not.toHaveBeenCalled();
});

test("test valid email login callback", () => {
  const stub = jest.fn().mockResolvedValue(true);
  render(<LoginForm loginCallback={stub} />);

  const emailInput = screen
    .getByTestId(/login-email-field/i)
    .querySelector("input");
  userEvent.type(emailInput, "adahen@kth.se");
  expect(emailInput.value).toBe("adahen@kth.se");
  screen.getByTestId(/login-submit-button/i).click();

  expect(stub).toHaveBeenCalled();
});
