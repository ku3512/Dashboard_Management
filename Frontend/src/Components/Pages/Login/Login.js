import React, { useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link,} from "react-router-dom";
import ThemeProvide from "../../CommonComponents/ThemeProvider/ThemeProvider";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlertDialog from "../../CommonComponents/DialogAlert/AlertDialog";


export default function Login() {
  const [loginData, setLoginData] = useState({ showPassword: false, flagStatus:0 });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [DisableBtn, setDisableBtn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [getId, setGetId] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogText, setdialogText] = useState(false);

  const param = {
    dialogText,
    setdialogText,
    // setLoggedIn,
    open,
    setOpen,
    getId,
  };
  const InputFiledData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value.length <= 6 || value.length > 10) {
        return false;
      }
      if (value.length === "") {
        return false;
      }

      return true;
    });
  }, []);

  const DataSender = async () => {
    try {
      const { data } = await axios({
        method: "post",

        url: "http://localhost:8080/login",

        data: loginData,
      });
      console.log(`data is ${data}`);
      if (typeof data == "string") {
        setLoading(false);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("UserData", data);
        // localStorage.setItem("UserId", data.id);
        // localStorage.setItem("companyName", data.companyName);
        setdialogText(true);
        setOpen(true);
        setGetId(data[0].id);
      }  
      if (typeof data == "boolean") {
        setdialogText(false);
        setGetId("");
        setOpen(true);
      }
    } catch (e) {
      setError(e.massage);
    } finally {
      setLoading(false);
      setDisableBtn(false);
    }
  };

  const handleClickShowPassword = () => {
    setLoginData({
      ...loginData,

      showPassword: !loginData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    DataSender();
    setIsLoggedIn(true);
    setLoading(true);
    // console.log(isUser);
  };


  return (
    <>
      <div>
        <AlertDialog
          {...param}
          successTitle="Logged In Successfully"
          successResult={
            <>
              Click on 'Go to dashboard' for redirect to dashboard.
              <br />
            </>
          }
          errorTitle="Already Logged In"
          errorResult={
            <>
           This Account is already loggedin in other device. <br />
           log out from there then Try Again.
              
            </>
          }
        />
      </div>
      <ThemeProvide title="Sign In" handleSubmit={handleSubmit}>
        <TextValidator
          sx={{ m: 1, width: "40ch" }}
          type="email"
          id="email"
          name="Email"
          label="Email Address"
          autoComplete="email"
          value={loginData.Email}
          validators={["required", "isEmail"]}
          errorMessages={["Email is required", "email is not valid"]}
          InputProps={{
            sx: {
              height: "45px",
              fontSize: "12px",
            },
          }}
          InputLabelProps={{
            style: { fontSize: 11, fontWeight: "bolder" },
          }}
          onChange={(e) => {
            InputFiledData(e);
            console.log("change");
            e.preventDefault();
          }}
        />

        <TextValidator
          onChange={(e) => {
            InputFiledData(e);
            console.log("change");
            e.preventDefault();
          }}
          label="Password"
          name="Password"
          id="password"
          type={loginData.showPassword ? "text" : "password"}
          value={loginData.Password}
          validators={["required"]}
          errorMessages={["this field is required", "this field is required"]}
          sx={{ m: 1, width: "40ch" }}
          InputProps={{
            sx: {
              height: "45px",

              fontSize: "12px",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {loginData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { fontSize: 11, fontWeight: "bolder" },
          }}
        />

        {/* <Grid item xs m={1} sx={{ fontSize: "13px" }}>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid> */}

        <Button
          sx={{ m: 1, width: "58ch", fontSize: "11px" }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={DisableBtn}
        >
          Sign in
        </Button>

        <Grid container sx={{ fontSize: "13px", mt: 1 }}>
          <Grid item>
            <Link to="/registration" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </ThemeProvide>
    </>
  );
}
