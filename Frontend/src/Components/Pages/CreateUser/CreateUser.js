import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BaseCard from "../../CommonComponents/BaseCard/BaseCard";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useRef } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();

export default function CreateUser() {
  const [error, setError] = React.useState(false);
  const [CreateUser, setCreateUser] = React.useState({
    name: "",
    username: "",
    role: "",
    flagStatus:'0'
  });
  const [open, setOpen] = React.useState(false);
 

  const InputFiledData = (e) => {
    setCreateUser({ ...CreateUser, [e.target.name]: e.target.value });
  };

  //post data using post method
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(!open);

    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:8080/adduser",
        data: CreateUser,
      });
      alert(`User Successfully Inserted!`);
      
    } catch (e) {
      setError(e.massage);
    }
    finally{
      setOpen(false);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mt: 15, mb: 4 }}>
        <CssBaseline />
        <BaseCard>
          <Box
            sx={{
              margin: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography mb={2} component="h1" variant="h5">
              User Creation
            </Typography>
            <ValidatorForm
              ref={useRef()}
              onError={(errors) => console.log(errors)}
              onSubmit={handleSubmit}
            >
              <TextValidator
                label="Name"
                onChange={(e) => InputFiledData(e)}
                name="name"
                value={CreateUser.name}
                validators={["required"]}
                errorMessages={["this field is required"]}
                sx={{ m: 1, width: "40ch" }}
                id="name"
                InputProps={{
                  sx: {
                    height: "45px",
                    fontSize: "12px",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 11, fontWeight: "bolder" },
                }}
              />
              <TextValidator
                label="Username"
                onChange={(e) => InputFiledData(e)}
                name="username"
                value={CreateUser.username}
                validators={["required"]}
                errorMessages={["this field is required"]}
                sx={{ m: 1, width: "40ch" }}
                id="username"
                InputProps={{
                  sx: {
                    height: "45px",
                    fontSize: "12px",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 11, fontWeight: "bolder" },
                }}
              />
              <TextValidator
                label="Role"
                onChange={(e) => InputFiledData(e)}
                name="role"
                value={CreateUser.role}
                validators={["required"]}
                errorMessages={["this field is required"]}
                sx={{ m: 1, width: "40ch" }}
                select
                id="role"
                InputProps={{
                  sx: {
                    height: "45px",
                    fontSize: "12px",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 11, fontWeight: "bolder" },
                }}
              >
                {[
                  { label: "FullStack Doveloper", value: "FullStackDoveloper" },
                  { label: "Cloud Engineer", value: "CloudEngineer" },
                  { label: "RPA Doveloper", value: "RPADoveloper" },
                  { label: "Frontend Doveloper", value: "FrontendDoveloper" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextValidator>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ m:2}}
                    style={{ fontSize: "12px" }}
                  >
                    Save
                  </Button> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ m: 2 }}
                    style={{ fontSize: "12px" }}
                  >
                    Save
                  </Button>
                  <Backdrop open={open}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Button
                    style={{ fontSize: "12px" }}
                    color="error"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ m: 2 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Box>
        </BaseCard>
      </Container>
    </ThemeProvider>
  );
}
