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
        fontSize: 15,
        margin: theme.spacing(1),
    },
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
        width:'97%',
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    modal: {
        height: '80vh',
        width: 'fit-content',
        overflow: 'scroll'
    }
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
            insuranceValability: insuranceDate,
            itpValability: itpDate,
            licencePlate: licensePlate,
            manufacturer: manufacturer,
            model: model,
            nextService: nextServiceDate,
            vin: vin,
            image: image
        };
        
        console.log('req', req);
        axios.post( "http://localhost:8000/cars", req).then(function(response){
            console.log(response);
            props.closeAction();
        }).catch(function(error){
            console.log(error);
        })
    }

    return(
        <div className={classes.modal}>
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h2">
                    Add new car
                </Typography>


                <div className={classes.wrapper}>
                    <h3 className={classes.label}>Manufacturer: </h3>
                    <TextField
                        id="manuf"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        className={classes.textField}
                        onChange={(event) => {setManufacturer(event.target.value)}}
                    />
                </div>

                <div className={classes.wrapper}>
                    <h3 className={classes.label}>Model: </h3>
                    <TextField
                        id="model"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        className={classes.textField}
                        onChange={(event) => {setModel(event.target.value)}}
                    />
                </div>

                <div className={classes.wrapper}>
                    <h3 className={classes.label}>Select fabrication date: </h3>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            value={fabricationDate}
                            onChange={handleFabricationDateChange}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                }
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <div className={classes.wrapper}>
                    <h3 className={classes.label}>Color: </h3>
                    <TextField
                        id="color"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        className={classes.textField}
                        onChange={(event) => {setColor(event.target.value)}}
                    />
                </div>

                <div className={classes.wrapper}>
                    <h3 className={classes.label}>Engine: </h3>
                    <TextField
                        id="engine"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        className={classes.textField}
                        onChange={(event) => {setEngine(event.target.value)}}
                    />
                </div>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className={classes.wrapper}>
                        <h3 className={classes.label}>Select insurance end date: </h3>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            value={insuranceDate}
                            onChange={handleInsuranceDateChange}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                }
                            }}
                        />
                    </div>

                    <div className={classes.wrapper}>
                        <h3 className={classes.label}>Select ITP end valability date: </h3>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            value={itpDate}
                            onChange={handleItpDateChange}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                }
                            }}
                        />
                    </div>

                    <div className={classes.wrapper}>
                        <h3 className={classes.label}>Select next service date: </h3>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            value={nextServiceDate}
                            onChange={handleNextServiceDateChange}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                }
                            }}
                        />
                    </div>
                </MuiPickersUtilsProvider>

                <div className={classes.wrapper}>
                    <h3 className={classes.label}>License plate: </h3>
                    <TextField
                        id="licenseplate"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        className={classes.textField}
                        onChange={(event) => {setLicensePlate(event.target.value)}}
                    />
                </div>

                <div className={classes.wrapper}>
                    <h3 className={classes.label}>VIN: </h3>
                    <TextField
                        id="vin"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        className={classes.textField}
                        onChange={(event) => {setVin(event.target.value)}}
                    />
                </div>

                <div className={classes.wrapper}>
                    <h3 className={classes.label}>Image link: </h3>
                    <TextField
                        id="image"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        className={classes.textField}
                        onChange={(event) => {setImage(event.target.value)}}
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
                        endIcon={<Icon>add</Icon>}
                        onClick={submitAddCar}
                    >
                        Add car
                    </Button>
                </div>

            </Grid>
        </div>
    )
}

export default AddCarForm;
