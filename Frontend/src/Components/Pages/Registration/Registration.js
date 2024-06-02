import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import InputField from "../../CommonComponents/InputField/InputField";
import axios from "axios";
import ThemeProvide from "../../CommonComponents/ThemeProvider/ThemeProvider";
import {PasswordValidation,TextValidation} from '../../CommonComponents/Validation/Validation';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Registration () {
  const [userData, setUserData] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    PasswordValidation(
      "isPasswordMatch",
      userData.confirmPassword,
      userData.password
    );
    TextValidation("isText", userData.companyName);
  }, [userData]);

  const dataSender = async () => {
    try {
      const { data } = await axios({
        method: "post",

        url: "http://localhost:8080/registration",

        data: userData,
      });

      if (typeof data == "number") {
        localStorage.setItem("UserId", data);

        console.log(`user created with ID ${data} `);

        alert("user created successfully");
      }

      if (typeof data == "string") {
        console.log(`user already ${data} `);

        alert("user already exists");
      }
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    } finally {
      setLoading(false);
      setDisableBtn(false);
    }
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dataSender();
    setLoading(true);
    if (loading) {
      setDisableBtn(true);
    }
    if (error) return error;
  };

  return (
    <>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <ThemeProvide title="Sign Up" handleSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Company Name"
          name="companyName"
          handleInput={handleInput}
          value={userData.companyName}
          validators={["required", "isText"]}
          errorMessages={["this field is required", "Numbers are not allowed"]}
        />
        <InputField
          type="email"
          label="Company Email Address"
          name="companyEmail"
          handleInput={handleInput}
          value={userData.companyEmail}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />

        <InputField
          type="password"
          label="Password"
          name="password"
          handleInput={handleInput}
          value={userData.password}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <InputField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          handleInput={handleInput}
          value={userData.confirmPassword}
          validators={["isPasswordMatch", "required"]}
          errorMessages={["password mismatch", "this field is required"]}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={disableBtn}
        >
          Create Account
        </Button>

        <Link href="#" variant="body2">
          {"Already have an account? Sign In"}
        </Link>
      </ThemeProvide>
    </>
  );
};
