import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BaseCard from '../../CommonComponents/BaseCard/BaseCard';
import axios from "axios";
import { useParams } from 'react-router-dom';

const theme = createTheme();


export default function EditUser() {
  const {id}= useParams();
  console.log(id)
   const [EditUser, setEditUser] = React.useState({id:id})
   const [error, setError] = React.useState(false);
   const [loading,setLoading] = React.useState(true);

console.log(EditUser)
  const InputFiledData = (e) => {
    setEditUser({ ...EditUser, [e.target.name]: e.target.value });
  };

  const dataUpdater = async () => {
    try {
      const { data } = await axios({
        method: "post",

        url: "http://localhost:8080/edituser",

        data: EditUser,
      });
      console.log(data)

      if (typeof data == "number") {
      //   localStorage.setItem("UserId", data);

      //   console.log(`user created with ID ${data} `);

        alert("user updated successfully");
      }
      else{
        alert("not updated ");
      }

      // if (typeof data == "string") {
      //   console.log(`user already ${data} `);

      //   alert("user already exists");
      // }
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    } finally {
      setLoading(false);
     
    }
  };


    const handleSubmit = async(e) => {
      e.preventDefault();
      dataUpdater()
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mt: 15, mb: 4 }}>
        <CssBaseline />
        <BaseCard>
        <Box
        onSubmit={handleSubmit}
          sx={{
            margin: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography mb={2} component="h1" variant="h5" >
           User Creation
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                  sx={{ m: 1, width: '40ch' }}
                  onChange={(e)=>InputFiledData(e)}
                  id="name"
                  name="name"
                  label="Name"
                  value={EditUser.name}
                  InputProps={{
                     sx: {
                        height: "45px",
                        fontSize: "12px",
                     }
                  }}
                  InputLabelProps={{ style: { fontSize: 11, fontWeight: "bolder" } }}
               />
            <TextField
                  sx={{ m: 1, width: '40ch' }}
                  onChange={(e)=>InputFiledData(e)}
                  id="username"
                  name="username"
                  label="Username"
                  value={EditUser.username}
                  InputProps={{
                     sx: {
                        height: "45px",
                        fontSize: "12px",
                     }
                  }}
                  InputLabelProps={{ style: { fontSize: 11, fontWeight: "bolder" } }}
               />
                <TextField
                  sx={{ m: 1, width: '40ch' }}
                  onChange={(e)=>InputFiledData(e)}
                  name="role"
                  id='role'
                  label="Role"
                  value={EditUser.role}
                  InputProps={{
                     sx: {
                        height: "45px",
                        fontSize: "12px",
                     }
                  }}
                  InputLabelProps={{ style: { fontSize: 11, fontWeight: "bolder" } }}
               />
            
            <Grid container spacing={2}>
             <Grid item xs={12} sm={5} >
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2,ml:2}}
              style={{fontSize:"12px"}}
            >
              Edit
            </Button>
            </Grid>
            <Grid item xs={12} sm={5}>
            <Button
            style={{fontSize:"12px"}}
             color="error"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, ml:2}}
            >
              Cancel
            </Button>
            </Grid>
            </Grid>
          </Box>
        </Box>
        </BaseCard>
      </Container>
    </ThemeProvider>
  );
}