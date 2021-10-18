import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// General verification of application running
test('Tests loading of application', () => {
  render(<App />);
  // Finds "Sign In" text
  const linkElement = screen.getByText(/Sign In/i);
  // Verifies if "Sign In" text is in the document
  expect(linkElement).toBeInTheDocument();
});

// Testing valid login
test('Login successful with form submission', async () => {

  // Checks if App component renders
  const result = render(<App />);

  // Storing variables for email and password input fields
  // and the form submission button.
  const email = result.container.querySelector('#email');
  const password = result.container.querySelector('#password');
  const formbutton = result.container.querySelector('#register');

  // fireEvent changes email and password to values listed in
  // in API notes for successful POST login at https://reqres.in/api/login
  fireEvent.change(email, {target: {value: "eve.holt@reqres.in"}});
  fireEvent.change(password, {target: {value: "cityslicka"}});

  // Added code to prevent window.alert error
  window.alert = jest.fn();
  window.alert.mockClear();

  // Simulates form submission
  fireEvent.submit(formbutton);

  // Tests if API call worked by finding login message text
  console.log(await screen.findByText('Login Successful!'));
});

// Testing invalid login
test('Login unsuccessful with form submission', async () => {

    // Checks if App component renders
    const result = render(<App />);

    // Storing variables for email and password input fields
    // and the form submission button.
    const email = result.container.querySelector('#email');
    const password = result.container.querySelector('#password');
    const formbutton = result.container.querySelector('#register');

    // fireEvent changes email and password to values listed in
    // in API notes for unsuccessful POST login at https://reqres.in/api/login
    fireEvent.change(email, {target: {value: "peter@klaven"}});
    fireEvent.change(password, {target: {value: ""}});

    // Added code to prevent window.alert error
    window.alert = jest.fn();
    window.alert.mockClear();

    // Simulates form submission
    fireEvent.submit(formbutton);

    // Tests if API call worked by finding login message text
    console.log(await screen.findByText('Login Unsuccessful!'));
});