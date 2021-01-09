import React from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
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

const CarCard = (props) => {

    var car = props.content;
    const classes = useStyles();

    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.control}>
                <Typography className={`modal-title ${classes.detailsTitle}`}>Vehicle details</Typography>
                <Divider variant="middle"/>
                <Typography className={classes.text}>License plate: {car.licencePlate}</Typography>
                <Typography className={classes.text}>Color: {car.color}</Typography>
                <Typography className={classes.text}>Engine: {car.engine}</Typography>
                <Typography className={classes.text}>Fabrication date: {car.fabricationDate}</Typography>
            </Grid>
        </div>
    )
}

export default CarCard;
