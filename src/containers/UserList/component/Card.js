import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  control:{
    paddingBottom:theme.spacing(3),
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Card = (props) => {
  const user = props.content;
  const classes = useStyles();

  return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center" className={classes.control}>
          <Typography variant="h5" className="modal-title">
            User details
          </Typography>
          <Divider variant="middle"/>
          <Typography>
            First Name: {user.firstName}
          </Typography>
          <Typography>
            Last Name: {user.lastName}
          </Typography>
          <Typography>
            Email: {user.email}
          </Typography>
          <Typography>
            Date Of Birth: {user.dateOfBirth}
          </Typography>
          <Typography>
            Job Title: {user.jobTitle}
          </Typography>
          <Typography>
            Role: {user.role}
          </Typography>
        </Grid>
      </div>
  );
};

export default Card;
