import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username,setusrname] = useState("");
  const [password,setpassword] = useState("");
  const [confirmpassword,setconfirmpassword]=useState("");
  const [buffer,setbuffer] = useState(false);
  


  const submit = () => {
    console.log("submit()");
    // let usr = e.target[0].value;
    // let psw = e.target[2].value;
    let obj = {
      username: username,
      password: password,
    };
    register(obj);
  };

  const check=(e)=>{
    let objdata={
      username:username,
      password:password,
      confirmpassword:confirmpassword,

    };
    console.log(objdata);
    validateInput(objdata);
   };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    setbuffer(true);
    console.log("register()");
    axios
      .post(config.endpoint+"/auth/register", formData)
      .then((response) => {
        if (response.status === 201) {

          enqueueSnackbar("Registered successfully",{variant:"success"});
        }setbuffer(false);
        

      }
      )
      .catch((err) => {
        console.log(err);
        if (err.response) {
          enqueueSnackbar("username is already taken",{variant:"error"});
          console.log("username already e");
        } else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON."
          ,{variant:"error"});
        }
        setbuffer(false);
      }
      );
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
   
  const validateInput = (data) => {
    if(data.username ===""){
      enqueueSnackbar("Username is a required field",{variant:"error"});
      return false;
    }
    if((data.username.length) <= 5 ){
      enqueueSnackbar("Username must be at least 6 characters",{variant:"error"});
      return false;
    }
    if(data.password ===""){
      enqueueSnackbar("Password is a required field",{variant:"error"});
      return false;
    }
    if(data.password.length <= 5){
      enqueueSnackbar("Password must be at least 6 characters",{variant:"error"});
      return false;
    }
    if(data.password !== data.confirmpassword){
      enqueueSnackbar("Passwords do not match",{variant:"error"});
      return false;
    }
    else{   
    submit();
  return true;}
  
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
              
              check(e);
            }}
          >
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              title="Username"
              name="username"
              placeholder="Enter Username"
              onChange={(e) => setusrname(e.target.value)}
              fullWidth
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              helperText="Password must be atleast 6 characters length"
              fullWidth
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter a password with minimum 6 characters"
            />
            <TextField
              id="confirmPassword"
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              onChange={(e)=>setconfirmpassword(e.target.value)}
            />{buffer?<CircularProgress/>:
            <Button type="submit" className="button" variant="contained" >Register now</Button>
            }
          </form>
          <p className="secondary-action">
            Already have an account?{" "}
            <a className="link" href="#">
              Login here
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
