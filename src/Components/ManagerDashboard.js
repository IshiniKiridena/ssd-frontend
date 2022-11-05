import React, { Component } from "react";
import axios from "axios";
import { FormControl, Button, TextField } from "@mui/material";
import CryptoJS from "crypto-js";

class ManagerDashboard extends Component {
  constructor(props) {
    const user = localStorage.getItem("username");
    super(props);

    this.state = {
      message: "",
      encryptedMsg: "",
      sender: user,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwtToken");
    this.state.encryptedMsg = CryptoJS.SHA256(this.state.message).toString();
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    axios
      .post("http://localhost:4000/messages/messages", this.state, {})
      .then((response) => {
        console.log(response);
        alert("Message sent successfully");
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        if (error.response.data.code === 401) {
          alert(
            "Message authentication failed, someones changing your data on the way to the server"
          );
        }
        if (error.response.data.code === 404) {
          alert("Message sending failed");
        }
      });
  };

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  }

  render() {
    var isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      const { message } = this.state;
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
            <br />
            <h2>Manager Dashboard</h2>
            <h3>Enter Message</h3>
            <form id="msgForm" onSubmit={this.handleSubmit}>
              <FormControl sx={{ width: "40ch" }} variant="outlined">
                <TextField
                  name="message"
                  id="message"
                  label="Message"
                  variant="outlined"
                  value={message}
                  onChange={this.handleChange}
                  required
                />{" "}
                <br />
                <Button variant="outlined" component="label">
                  Upload File
                  <input type="file" hidden />
                </Button>
                <br />
                <Button type="submit" variant="contained">
                  Send
                </Button>
              </FormControl>
            </form>
            <br />
            <br />
            <br />
            <Button
              variant="outlined"
              color="error"
              onClick={() => this.logout()}
            >
              Logout
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Please login to continue</h1>
          <Button
            variant="outlined"
            color="error"
            onClick={() => this.logout()}
          >
            Go to login
          </Button>
        </div>
      );
    }
  }
}

export default ManagerDashboard;
