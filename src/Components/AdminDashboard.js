import React, { Component } from "react";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField,Button } from "@mui/material";

class AdminDashboard extends Component{

    constructor(props){
        super(props)
    
        this.state={
            username:'',
            password:'',
            role:''
        }
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit =(e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/users/create',this.state,{
    
        })
        .then(response =>{
            console.log(response)
        })
    }

    logout() {
        localStorage.clear();
        window.location.href = "/";
      }

    render(){
        const{username,password,role} = this.state
        const user = localStorage.getItem("username");

        return(
            <div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "100vh"}}>
                <div>
            <h2>Welcome {user}</h2>
            <br/>
            <h3>Create User</h3>
            <form id="regForm" onSubmit={this.handleSubmit}>
            <FormControl sx={{ width: "40ch" }} variant="outlined">
                <TextField name="username" id="username" label="Username" variant="outlined" value={username} onChange={this.handleChange} required/>{" "}
                <br />
                <TextField name="password" id="password" label="Password" variant="outlined" value={password} onChange={this.handleChange} required/>{" "}
                <br/>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
                    <Select name="role"
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={role}
                    onChange={this.handleChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Worker"}>Worker</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    </Select>
                    </FormControl>
                    <br/>
                <Button type="submit" variant="contained">Submit</Button>
                </FormControl>
            </form>
            <br/><br/><br/>
            <Button variant="outlined" color="error" onClick={()=>this.logout()}>Logout</Button>
            </div>
            
        </div>  
        )
    }
}

export default AdminDashboard;