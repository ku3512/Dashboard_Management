import React from "react";
import { TextValidator } from "react-material-ui-form-validator";

export default function InputField({
  label,
  type,
  name,
  handleInput,
  value,
  validators,
  errorMessages,
}) {
  return (
    <>
      <TextValidator
        onChange={(e) => {
          handleInput(e);
        }}
        type={type}
        value={value}
        validators={validators}
        errorMessages={errorMessages}
        sx={{ m: 1, width: "40ch" }}
        autoComplete="company_email"
        id={name}
        required
        label={label}
        name={name}
        InputProps={{
          sx: {
            height: "45px",
            fontSize: "12px",
          },
        }}
        InputLabelProps={{ style: { fontSize: 11, fontWeight: "bolder" } }}
      />
    </>
  );
}
