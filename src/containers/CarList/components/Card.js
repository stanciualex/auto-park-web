import React from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    control:{
        paddingBottom:theme.spacing(3),
    },
}));

const CarCard = (props) => {

    var car = props.content;
    const classes = useStyles();

    return(
        <Grid container direction="column" justify="center" alignItems="center" className={classes.control}>
            <Typography className="modal-title">Vehicle details</Typography>
            <Typography>License plate: {car.licencePlate}</Typography>
            <Typography>Color: {car.color}</Typography>
            <Typography>Engine: {car.engine}</Typography>
            <Typography>Fabrication date: {car.fabricationDate}</Typography>
        </Grid>
    )
}

export default CarCard;