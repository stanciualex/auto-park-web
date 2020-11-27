import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

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
    const [selectedModel, setModel] = React.useState()
    const [selectedManufacturer, setManufacturer] = React.useState()
    const [selectedColor, setSelectedColor] = React.useState()
    const [selectedEngine, setEngine] = React.useState()
    const [selectedVin, setVin] = React.useState()
    const [selectedLicensePlate, setLicensePlate] = React.useState()

    const handleFabricationDateChange = (date) => {
        setFabricationDate(date);
    }

    const handleInsuranceDateChange = (date) => {
        setInsuranceDate(date);
    }

    const handleItpDateChange = (date) => {
        setItpDate(date);
    }

    const handleServiceDateChange = (date) => {
        setNextServiceDate(date);
    }

    const handleManufacturerChange = (input) => {
        setManufacturer(input);
    }

    const handleModelChange = (input) => {
        setModel(input);
    }

    const handleEngineChange = (input) => {
        setEngine(input);
    }

    const handleVinChange = (input) => {
        setVin(input);
    }

    const handleColorChange = (color) => {
        setSelectedColor(color);
    }

    const handleLicensePlateChage = (input) => {
        setLicensePlate(input);
    }

    const submitAddCar = () => {
        const req = {
            color: "color",
            deleted: false,
            engine: "engine",
            fabricationDate: fabricationDate,
            image: "image_link",
            insuranceValability: insuranceDate,
            itpValability: itpDate,
            licencePlate: "licensePlate",
            manufacturer: "manufacturer",
            model: "model",
            nextService: nextServiceDate,
            vin: "vin",
        };
        axios.post('http://192.168.0.163:8000/cars', req).then(function(response){
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
                <TextField id="manuf" label="Manufacturer" onChange={handleManufacturerChange}/>
                <TextField id="model" label="Model" onChange={handleModelChange}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select fabrication date" onChange={handleFabricationDateChange} />
                </MuiPickersUtilsProvider>
                <TextField id="color" label="Color" onChange={handleColorChange}/>
                <TextField id="engine" label="Engine" onChange={handleEngineChange}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select insurance end date" onChange={handleInsuranceDateChange} />
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select ITP end valability date" onChange={handleItpDateChange} />
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select next service date" onChange={handleServiceDateChange} />
                </MuiPickersUtilsProvider>
                <TextField id="licenseplate" label="License plate" onChange={handleLicensePlateChage}/>
                <TextField id="vin" label="VIN" onChange={handleVinChange}/>
                <Button className={classes.button} variant="contained" color="primary" endIcon={<Icon>add</Icon>} onClick={submitAddCar}>Add car</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={props.closeAction}>Cancel</Button>
            </Grid>
        </div>
    )
}

export default AddCarForm;