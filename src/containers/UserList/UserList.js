import React, {useEffect, useState} from 'react';
import AddUser from "./component/AddUser";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Container from "@material-ui/core/Container";
import User from "./component/User";

const baseUrl ='http://localhost:8000'
const userUrl = `${baseUrl}/users`

const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get(userUrl)
        .then(response => {
          setUsers(response.data.data);
        })
        .catch(error => console.log(error))
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <div className="carsPageHeader">
        <h1 className="carsPageTitle">Users</h1>
        <AddUser refreshState={getUsers}/>
      </div>
      <Container className="mainContent">
        {users && users.map((user) => <User key={user.id} content={user}/>)}
      </Container>
    </Grid>
  );
};

export default UserList;
