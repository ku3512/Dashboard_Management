import ThemeProvide from "../../CommonComponents/ThemeProvider/ThemeProvider";
import Backdrop from "@mui/material/Backdrop";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  PasswordValidation,
  TextValidation,
} from "../../CommonComponents/Validation/Validation";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import InputField from "../../CommonComponents/InputField/InputField";

export default function ChangePassword() {
  const [updatePswd, setUpdatePswd] = useState({
    UserData: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    PasswordValidation(
      "isPasswordMatch",
      updatePswd.confirmPassword,
      updatePswd.newPassword
    );
  }, [updatePswd]);

  updatePswd.UserData = localStorage.getItem("UserData");

  const UpdateData = async () => {
    try {
      const { data } = await axios({
        method: "post",

        url: "http://localhost:8080/changepassword",

        data: updatePswd,
      });

      console.log(`result is ${data}`);

      if (typeof data == "number") {
        console.log(`user password reset ${data} `);

        alert("user password reseted successfully");
      }

      if (typeof data == "string") {
        console.log(`Exist password is  ${data} `);

        alert("Exist password is not matched");
      }
    } catch (e) {
      setError(e.message);

      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatePswd({ ...updatePswd, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateData();
    setLoading(true);
    if (loading) {
      setDisableBtn(true);
    }
    if (error) return error;
    console.log(updatePswd);
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
          type="password"
          label="Old Password"
          name="oldPassword"
          handleInput={handleInput}
          value={updatePswd.oldPassword}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <InputField
          type="password"
          label="New Password"
          name="newPassword"
          handleInput={handleInput}
          value={updatePswd.newPassword}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />

        <InputField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          handleInput={handleInput}
          value={updatePswd.confirmPassword}
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
          Reset Password
        </Button>
      </ThemeProvide>
    </>
  );
}
