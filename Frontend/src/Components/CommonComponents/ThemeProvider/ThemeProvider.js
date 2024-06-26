import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BaseCard from "../BaseCard/BaseCard";
import { useRef } from "react";
import { ValidatorForm} from "react-material-ui-form-validator";


const theme = createTheme();


export default function ThemeProvide (props) {
  const handleSubmit = props.handleSubmit;

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
              {props.title}
            </Typography>
            <ValidatorForm
              ref={useRef()}
              onError={(errors) => console.log(errors)}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              {props.children}
            </ValidatorForm>
          </Box>
        </BaseCard>
      </Container>
    </ThemeProvider>
  );
};
