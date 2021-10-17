import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// General verification of application running
test('Tests loading of application', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sign In/i);
  expect(linkElement).toBeInTheDocument();
});

// Testing valid login
test('Login successful with form submission', async () => {

  const result = render(<App />);
  const email = result.container.querySelector('#email');
  const password = result.container.querySelector('#password');
  const formbutton = result.container.querySelector('#register');

  fireEvent.change(email, {target: {value: "eve.holt@reqres.in"}});
  fireEvent.change(password, {target: {value: "cityslicka"}});

  fireEvent.submit(formbutton);
  console.log(await screen.findByText('Login Successful!'));
});

// Testing invalid login
test('Login unsuccessful with form submission', async () => {

    const result = render(<App />);
    const email = result.container.querySelector('#email');
    const password = result.container.querySelector('#password');
    const formbutton = result.container.querySelector('#register');

    fireEvent.change(email, {target: {value: "peter@klaven"}});
    fireEvent.change(password, {target: {value: ""}});

    fireEvent.submit(formbutton);
    console.log(await screen.findByText('Login Unsuccessful!'));
});