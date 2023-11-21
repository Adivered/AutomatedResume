import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "../css/AppBar.css";

const CustomAppBar = ({ step }) => {
  return (
    <AppBar className="app-bar" position="static">
      <Toolbar>
        <Typography variant="h6">Resume Builder</Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="subtitle1">Step {step}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
