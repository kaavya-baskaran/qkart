import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        {localStorage.getItem("username")?
       
       (<Stack direction="row" spacing={2}>
          <Avatar alt={localStorage.getItem("username")} src="avatar.png" />
          <p>{localStorage.getItem("username")}</p>
          <Button variant="text" onClick={() => {
           localStorage.clear();
           history.push("/");} }
          >LOGOUT</Button>
          </Stack>):
          
          (hasHiddenAuthButtons?
          
          (<Stack direction="row" spacing={2}>
            <Button variant="text" onClick={() => history.push("/login")}>LOGIN</Button>
            <Button variant="contained" onClick={() => history.push("/register")}>REGISTER</Button>
          </Stack>):
        
        (<Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>))
        }
          
        
      </Box>
    );
};

export default Header;
