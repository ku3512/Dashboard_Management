import React from "react";
import style from './Footer.module.css';
import { Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';


export default function Footer(){
  
  return (
    <>
      <footer>
          <Typography color="inherit" noWrap sx={{ flexGrow: 1, fontSize:"12px", paddingRight:"10px"}}>
            Copyright © 2022. All right reserved.
            <TwitterIcon  style={{float:"right", fontSize:"25px", paddingRight:"10px"}}/>
            <LinkedInIcon style={{float:"right", fontSize:"25px", paddingRight:"10px"}}/>
            <GoogleIcon style={{float:"right", fontSize:"25px", paddingRight:"10px"}}/>
            <FacebookIcon style={{float:"right", fontSize:"25px", paddingRight:"10px"}}/>
          </Typography>
      </footer>
    </>
  );
};
