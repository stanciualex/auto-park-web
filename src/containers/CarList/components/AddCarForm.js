import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import API_URL from "../../../config";

const axios = require('axios').default

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const AddCarForm = (props) => {
    const classes = useStyles();

    const [fabricationDate, setFabricationDate] = React.useState(Date.now())
    const [insuranceDate, setInsuranceDate] = React.useState(Date.now())
    const [itpDate, setItpDate] = React.useState(Date.now())
    const [nextServiceDate, setNextServiceDate] = React.useState(Date.now())
    const [model, setModel] = React.useState()
    const [manufacturer, setManufacturer] = React.useState()
    const [color, setColor] = React.useState()
    const [engine, setEngine] = React.useState()
    const [vin, setVin] = React.useState()
    const [licensePlate, setLicensePlate] = React.useState()
    const [image, setImage] = React.useState()

    const handleFabricationDateChange = (date) => {
        setFabricationDate(date);
    }

    const handleInsuranceDateChange = (date) => {
        setInsuranceDate(date);
    }

    const handleItpDateChange = (date) => {
        setItpDate(date);
    }

    const handleNextServiceDateChange = (date) => {
        setNextServiceDate(date);
    }

    const submitAddCar = () => {
        const req = {
            color: color,
            deleted: false,
            engine: engine,
            fabricationDate: fabricationDate,
            image: image,
            insuranceValability: insuranceDate,
            itpValability: itpDate,
            licencePlate: licensePlate,
            manufacturer: manufacturer,
            model: model,
            nextService: nextServiceDate,
            vin: vin,
            image: image
        };
        axios.post( "http://localhost:8000/cars", req).then(function(response){
            console.log(response);
            props.closeAction();
        }).catch(function(error){
            console.log(error);
        })
    }

    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h5">Add new car</Typography>
                <TextField id="manuf" label="Manufacturer" onChange={(event) => {setManufacturer(event.target.value)}}/>
                <TextField id="model" label="Model" onChange={(event) => {setModel(event.target.value)}}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>                                                                                 
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select fabrication date" value={fabricationDate} onChange={handleFabricationDateChange} />
                </MuiPickersUtilsProvider>
                <TextField id="color" label="Color" onChange={(event) => {setColor(event.target.value)}}/>
                <TextField id="engine" label="Engine" onChange={(event) => {setEngine(event.target.value)}}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select insurance end date" value={insuranceDate} onChange={handleInsuranceDateChange} />
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select ITP end valability date" value={itpDate} onChange={handleItpDateChange} />
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select next service date" value={nextServiceDate} onChange={handleNextServiceDateChange} />
                </MuiPickersUtilsProvider>
                <TextField id="licenseplate" label="License plate" onChange={(event) => {setLicensePlate(event.target.value)}}/>
                <TextField id="vin" label="VIN" onChange={(event) => {setVin(event.target.value)}}/>
                <TextField id="image" label="Image link" onChange={(event) => {setImage(event.target.value)}}/>
                <Button className={classes.button} variant="contained" color="primary" endIcon={<Icon>add</Icon>} onClick={submitAddCar}>Add car</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={props.closeAction}>Cancel</Button>
            </Grid>
        </div>
    )
}

export default AddCarForm;