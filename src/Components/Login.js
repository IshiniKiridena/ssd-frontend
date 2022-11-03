import { Button, FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { Component } from "react";

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
    // axios
    //   .post("http://localhost:4000/users/login", this.state, {})
    //   .then((response) => {
    //     alert("Logged in");
    //   }).catch(error => {
    //     alert("Login failed, please try again")
    //   })
    alert(this.state.username + " with " + this.state.password);
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
          <h3>Sign in with your employee account</h3>
          <form onSubmit={this.handleSubmit}>
            <FormControl sx={{ width: "40ch" }} variant="outlined">
              <TextField
                name="username"
                value={username}
                id="username"
                label="Username"
                variant="outlined"
                onChange={this.handleChange}
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
              />{" "}
              <br />
              <Button type="submit" variant="contained">
                Sign in
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
