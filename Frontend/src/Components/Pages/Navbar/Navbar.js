import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import style from './Navbar.module.css';
import { Link,Navigate } from "react-router-dom";
import axios from "axios";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const logout = () => {
    DataSender()
    localStorage.clear();
    // setLoggedIn(true);
    Navigate("/login");
  };

  const mdTheme = createTheme();
const id = localStorage.getItem("UserId");
console.log(`id is ${id}`)
const DataSender = async () => {
  try {
    const { data } = await axios({
      method: "post",

      url: "http://localhost:8080/logout",

      data: {id:id},
    });
    console.log(`data is ${data}`);
    
  } catch (e) {
    setError(e.massage);
  } finally {
    setLoading(false);
    // setDisableBtn(false);
  }
};

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute">
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                <img src="./agtech-logo.png" alt="logo" />
              </Typography>
              <div className={style.navbar}>
                <Link to="/">Dashboard</Link>
                <div className={style.dropdown}>
                  <button className={style.dropbtn}>
                    User Management
                    <i
                      className="fa fa-caret-down"
                      style={{ marginLeft: "5px", marginTop: "3px" }}
                    ></i>
                  </button>
                  <div className={style.dropdown_content}>
                    <Link to="/createuser">Create User</Link>
                    <Link to="/edituser">Edit User</Link>
                  </div>
                </div>
                <Link to="/changepassword">Change Password</Link>
                {/* <Link to="/login">Log Out</Link> */}
                
                <div className={style.dropdown}>
                  <button className={style.dropbtn}>
                    User
                    <i
                      className="fa fa-caret-down"
                      style={{ marginLeft: "5px", marginTop: "3px" }}
                    ></i>
                  </button>
                  <div className={style.dropdown_content}>
                    <Link onClick={logout} to="/login">Logout</Link>
                  </div>
                </div>

              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
