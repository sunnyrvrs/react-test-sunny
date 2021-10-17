import './App.css';
import React, { useState } from "react";
import axios from 'axios';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import $ from 'jquery';

// Main App component
function App() {

  // Setting state for email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Clears email and password in state
  function clearValue() {
    setEmail("");
    setPassword("");
  }

  // Clears extra messages when refreshing the page
  function clearStatus() {
    unmountComponentAtNode(document.getElementById('login-status-2'));
    unmountComponentAtNode(document.getElementById('password-status-2'));
  }

  // Event listener for refreshing page -> runs clearStatus();
  function componentDidUpdate() {
    window.addEventListener("beforeunload", clearStatus());
  }

  // Password length verification (1 char or more)
  function logkey() {
    if(password.length <= 0) {
      // Displays message about password length requirements
      ReactDOM.render(<div id="password-status-2">Password length must be one character or more</div>, document.getElementById('password-status-1'));
      // Show password length message
      $("#password-status-2").show()
    } else if (password.length > 0) {
      // Hide password length message
      $("#password-status-2").hide()
    }
  }

  // Conducts password length verification on every key stroke
  document.addEventListener('keyup', logkey);

  const postRequest = function (e) {
    e.preventDefault();

    // Pulling state data into an object to be sent as a POST
    // to the login API
    const body = { email: email, password: password };

    try {
      if (password.length <= 0){
        // Displaying unsuccessful login for user
        ReactDOM.render(<div id="login-status-2">Login Unsuccessful!</div>, document.getElementById('login-success'));
        // Alert informing user to enter password with one char or more
        alert("Please enter a password with one or more characters in order to login successfully.");
        return;
      } else {
        // Axios API POST request
        axios.post(`https://reqres.in/api/login`, body)
        .then((val) => {
            // Logs successful API response
            console.log(JSON.stringify(val));
            // Displaying successful login for user
            ReactDOM.render(<div id="login-status-2">Login Successful!</div>, document.getElementById('login-success'));
        })
        .catch(
          function (error) {
            // Logs API response error
            console.log(JSON.stringify(error));
            // Displaying unsuccessful login for user
            ReactDOM.render(<div id="login-status-2">Login Unsuccessful!</div>, document.getElementById('login-success'));
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
          {/* Importing Bootstrap + CSS file */}
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
              integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="style.css"/>
      
          <div className="container">
              <div className="login">
                  {/* Login form | postRequest function calls on onSubmit */}
                  <form id="form" onSubmit={postRequest}>
                    <div className="row">
                        <h2>Sign In</h2>
                        <div className="col-md-12">
                            <label>Email</label>
                            {/* E-mail address validation through setting the type
                            attribute of input to "email". */}
                            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(`${e.target.value}`)}/>
                            <br/>
                            <label>Password</label>
                            {/* Password length validation is setup 
                            via above in a function */}
                            <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            {/* Clears email and password input */}
                            <input type="reset" id="reset" value="Reset" className="btn btn-outline-primary btn-form" onClick={clearValue}/>
                        </div>
                        <div className="col-md-6">
                            {/* Login button | Attempts API POST request */}
                            <input type="submit" id="register" value="Login" className="btn btn-outline-success btn-form"/>
                            </div>
                        </div>
                  </form>
                  {/* Miscellaneous messages to verify login success and password length */}
                  <br/>
                  {/* Login success message */}
                  <div id="login-success"></div>
                  <br/>
                  {/* Password length message */}
                  <div id="password-status-1"></div>
              </div>
            </div>

    </>
  );
}

export default App;