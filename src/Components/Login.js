import { Button, FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import emailjs from "emailjs-com";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/users/login", this.state)
      .then((res) => {
        sessionStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem("username", res.data.username);
        axios.defaults.headers.common["Authorization"] =
          "Bearer" + res.data.username;

        //TODO Get the username from the response
        var userEmail = res.data.username;

        //TODO generate a random number
        var otp = Math.floor(100000 + Math.random() * 900000);

        const templateParams = {
          to: userEmail,
          otp: otp,
        };

        //TODO send the random number to the email
        emailjs
          .send(
            "service_lt7cz4k",
            "template_pmkafkb",
            templateParams,
            "wl6cdGZSnoxsKMJcf"
          )
          .then(
            (result) => {
              //TODO get the user input in the confirm box input
              var enteredOTP; 
              while(enteredOTP == null) enteredOTP = prompt("Please enter OTP");

              if (enteredOTP == otp) {
                //TODO compare and continue to access control
                alert(this.state.username + " logged in successfully");
                const decoded = jwtDecode(res.data.token);
                sessionStorage.setItem("role", decoded.role);
                console.log(decoded.role);
                //check the role and redirect to the view
                if (decoded.role === "Admin") {
                  window.location.href = "/admin";
                } else if (decoded.role === "Manager") {
                  window.location.href = "/manager";
                } else if (decoded.role === "Worker") {
                  window.location.href = "/worker";
                } else {
                  window.location.href = "#";
                }
              }else{
                alert("Invalid OTP, please try again");
              }
            },
            (error) => {
              alert("Login failed at OTP email, please try again");
            }
          );
      })
      .catch((error) => {
        alert("Login failed, please try again");
      });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <h3>Login with your employee account</h3>
          <form onSubmit={this.handleSubmit}>
            <FormControl sx={{ width: "40ch" }} variant="outlined">
              <TextField
                name="username"
                value={username}
                id="username"
                label="Username"
                variant="outlined"
                onChange={this.handleChange}
                required
              />{" "}
              <br />
              <TextField
                type="password"
                name="password"
                value={password}
                id="password"
                label="Password"
                variant="outlined"
                onChange={this.handleChange}
                required
              />{" "}
              <br />
              <Button type="submit" variant="contained">
                Login
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
