import React from "react";
import BaseCard from "../../CommonComponents/BaseCard/BaseCard";
import axios from 'axios';
import {
  Typography, Table, TableBody,
  TableCell, TableHead, TableRow, Box
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";


const UsersData =()=> {
  const [User, setUser] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
const [editUserId, setEditUserId]= React.useState({})
  React.useEffect(() => {
    loadUsers();
  },[]);

  const loadUsers = async () => {
   try{
    const {data}= await axios.get("http://localhost:8080/users")
    setUser(data);
   }
   catch(e){
    setError(e.massage)
   }
}

// const editUser= async(itemId)=>{
//   try {
//     const {data}  = await axios({
//       method: "delete",
//       url: (`http://localhost:8080/edituser`),
//       data: {id:itemId},
//     });
//     console.log(data);
//     // alert(`User Successfully Deleted ! `);
//     loadUsers();

//   } catch (e) {
//     setError(e.massage);
//   }
// }



// delete function

const deleteUser= async(id)=>{
  try {
    const {data}  = await axios({
      method: "delete",
      url: (`http://localhost:8080/delete/${id}`),
      data:User,
    });
    console.log(data);
    alert(`User Successfully Deleted ! -- ${id}`);
    loadUsers();

  } catch (e) {
    setError(e.massage);
  }
};

//update function
// const editUser = async()=>{
//   try {
//     const {data}  = await axios({
//       method: "get",
//       url: "http://localhost:8888/update",
//       data: User,
//     });
//    const newData = await setUser(data);
//     console.log(newData);
//   } catch (e) {
//     setError(e.massage);
//   }

// }
   
    return(
        <>
<BaseCard>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="black" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="black" variant="h6">
                User Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="black" variant="h6">
                Role
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="black" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {User.map((item,i)=>{
          return (
            <TableRow key={i}>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {item.username}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {item.role}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      <Link to={`/edituser/${item.id}`} ><EditIcon/></Link>
                     {/* <Link to="/edituser"><EditIcon onClick={()=>{console.log(item.id)
                     setEditUserId(item.id)
                    }}/></Link>  */}
                     <DeleteIcon onClick={()=>deleteUser(item.id)} sx={{ml:1}}/>
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          )
         })}
        </TableBody>
      </Table>
</BaseCard>

        </>
    )
}

export default UsersData;