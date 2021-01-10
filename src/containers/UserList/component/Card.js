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
  detailsTitle: {
    fontSize: '25px'
  },
  text: {
    fontSize: '20px'
  }
}));

const Card = (props) => {
  const user = props.content;
  const classes = useStyles();

  return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center" className={classes.control}>
          <Typography className={`modal-title ${classes.detailsTitle}`}>
            User details
          </Typography>
          <Divider variant="middle"/>
          <Typography className={classes.text}>
            First Name: {user.firstName}
          </Typography>
          <Typography className={classes.text}>
            Last Name: {user.lastName}
          </Typography>
          <Typography className={classes.text}>
            Email: {user.email}
          </Typography>
          <Typography className={classes.text}>
            Job Title: {user.jobTitle}
          </Typography>
          <Typography className={classes.text}>
            Role: {user.role}
          </Typography>
        </Grid>
      </div>
  );
};

export default Card;
