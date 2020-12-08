import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from 'axios'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AddUserForm = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)

  const handleSubmit = () => {
    const request = {
      email: email,
      role: isAdmin ? 'admin' : 'user'
    }

    axios.post('http://localhost:8000//users/invite', request).then(function(response){
      console.log(response);
      props.closeAction();
    }).catch(function(error){
      console.log(error);
    });
  }

  return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h5">
          Invite user
        </Typography>

        <TextField id="email" label="Email: " onChange={(event) => {setEmail(event.target.value)}}/>

        <FormControlLabel
            control={
              <Checkbox checked={isAdmin} onChange={(event) => {setIsAdmin(event.target.checked)}} name="isAdmin" />
            }
            label="Admin"
        />

        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
        >
          Invite user
        </Button>
        <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={props.closeAction}
        >
          Cancel
        </Button>
      </Grid>
  );
};

export default AddUserForm;
