import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}>
        Patient Monitor
      </Typography>
      <Button color="inherit" 
          onClick={() => navigate("/patient")}>Patient</Button>
      <Button color="inherit"
          onClick={() => navigate("/doctor")} >Doctor</Button>
    </Toolbar>
  );
}
