import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import UsersData from "./UsersData";
import { Box } from "@mui/system";
import { Navigate } from "react-router-dom";

function Dashboard() {
  React.useEffect(()=>{
    // localStorage.clear();
    if(!localStorage.getItem('loggedin')){
      <Navigate to='/login' />
    }
    // if (window.performance) {
    //   if (performance.navigation.type == 1) {
    //     localStorage.clear();
    //       <Navigate to='/login' />
    //     // alert( "This page is reloaded" );
    //   } else {
    //     alert( "This page is not reloaded");
    //   }
    // }
    // if(window.location.reload(false)){
    //   localStorage.clear();
    //   <Navigate to='login' />
    // }
  })
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Box style={{ textAlign: "center" }}>
        <h2>CERT User List</h2>
        <label>Search: </label>
        <input
          type="text"
          name="search"
          style={{ width: "200px", height: "30px" }}
        />
      </Box>
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12}>
           <UsersData /> {/* Users Data Show in Table  */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
