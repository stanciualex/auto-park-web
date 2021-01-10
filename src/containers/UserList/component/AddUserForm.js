import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from 'axios'
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 15,
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300,
    // margin: 100,
  },
//style for font size
  resize:{
    fontSize: 20
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  label: {
    marginRight: 20
  },
  wrapper: {
    width:'100%',
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20
  }
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
        <Typography variant="h2">
          Invite user
        </Typography>

        <div className={classes.wrapper}>
          <h3 className={classes.label}>Email: </h3>
          <TextField
              id="email"
              InputProps={{
                classes: {
                  input: classes.resize,
                }
              }}
              className={classes.textField}
              onChange={(event) => {setEmail(event.target.value)}}
          />
        </div>

        <div className={classes.wrapper}>
          <h3 className={classes.label}>Admin</h3>
          <FormControlLabel
              control={
                <Checkbox checked={isAdmin} onChange={(event) => {setIsAdmin(event.target.checked)}} name='isAdmin' />
              }
              label=''
          />
        </div>

        <div className={classes.footer}>
          <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={props.closeAction}
          >
            Cancel
          </Button>
          <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
          >
            Invite user
          </Button>
        </div>
      </Grid>
  );
};

export default AddUserForm;
