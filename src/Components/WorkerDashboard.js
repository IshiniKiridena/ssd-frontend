import React, { Component } from "react";
import axios from 'axios';
import { FormControl,Button,TextField } from "@mui/material";

class WorkerDashboard extends Component{

    constructor(props){
        super(props)
    
        this.state={
            message:'',
            sender:''
        }
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit =(e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/messages/messages',this.state,{
    
        })
        .then(response =>{
            console.log(response)
        })
    }

    render(){
        const{message} = this.state

        return(
            <div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "100vh"}}>
            <div>
                <h3>Enter Message</h3>
                <form id="msgForm" onSubmit={this.handleSubmit}>
                <FormControl sx={{ width: "40ch" }} variant="outlined">
                <TextField name="message" id="message" label="Message" variant="outlined" value={message} onChange={this.handleChange} required/>{" "}
                <br />
                <Button type="submit" variant="contained">Send</Button>
                </FormControl>
                </form>
                
        </div>  
        </div>
        )
    }
}

export default WorkerDashboard;