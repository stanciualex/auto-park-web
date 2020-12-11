import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import UserCard from './Card';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  accordionTitle: {
    paddingLeft: '18px',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const User = (props) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const id = props.content.id;
  const user = props.content;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
      <div className='carItem'>
        <Accordion expanded={expanded === id} onChange={handleChange(id)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container direction="column" justify="space-around" alignItems="flex-start">
              <div className={classes.titleWrapper}>
                <div className="div1">
                  <img className="imag" src="https://boostchiropractic.co.nz/wp-content/uploads/2016/09/default-user-img.jpg" width="100" height="80" alt="car_photo"/>
                </div>
                <Typography variant="h5" className={classes.accordionTitle}>
                  {user.email}
                </Typography>
              </div>
            </Grid>
          </AccordionSummary>
          <AccordionDetails style={{justifyContent: 'center'}}>
            <Grid container direction="column" justify="center" alignItems="center">
              <UserCard content={user}/>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
  );
};

export default User;
