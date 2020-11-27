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
}));

const CarCard = (props) => {

    var car = props.content;
    const classes = useStyles();

    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.control}>
                <Typography variant="h5" className="modal-title">Vehicle details</Typography>
                <Divider variant="middle"/>
                <Typography>License plate: {car.licencePlate}</Typography>
                <Typography>Color: {car.color}</Typography>
                <Typography>Engine: {car.engine}</Typography>
                <Typography>Fabrication date: {car.fabricationDate}</Typography>
            </Grid>
        </div>
    )
}

export default CarCard;