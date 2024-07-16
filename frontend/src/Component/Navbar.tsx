import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate()
  return (
    <AppBar position="static">
      <Toolbar variant="regular">
        <Typography variant="h6">Navbar</Typography>
        <div style={{position:"absolute",right:0}}>
          <Button
            variant="text"
            color="secondary"
            size="large"    
            onClick={()=>navigate("/login")}
          >
            Login
          </Button>
          <Button
            onClick={()=>navigate("/register")}
            variant="text"
            color="secondary"
            size="large"    
          >
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
