import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import '@date-io/date-fns'
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import MuiAlert from '@material-ui/lab/alert';
import config from '../../../config'
=======
import * as https from "https";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import config from '../../../config';
>>>>>>> 5516f76 (save)

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
        width:'100%',
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RequestForm = (props) => {
    var car = props.content;
    const classes = useStyles();

    const [selectedStartDate, setSelectedStartDate] = React.useState(Date.now());
    const [selectedEndDate, setSelectedEndDate] = React.useState(Date.now())
    const [selectedReason, setSelectedReason] = React.useState(null)

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date)
    }

    const submitRequest = () => {
        const request = {
            carId: car.id,
            userId: '1',
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            details: selectedReason,
            state: 'requested',
            deleted: false
        };
        axios.post(`${config.API_URL}/rentals`, request).then(function(response){
            console.log(response);
            props.closeAction();
        }).catch(function(error){
            console.log(error);
        })
    }

    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography className="modal-title">Request for {car.manufacturer} {car.model}</Typography>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className={classes.wrapper}>
                        <h3 className={classes.label}>Select start date: </h3>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            value={selectedStartDate}
                            onChange={handleStartDateChange}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                }
                            }}
                        />
                    </div>

                    <div className={classes.wrapper}>
                        <h3 className={classes.label}>Select end date: </h3>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            value={selectedEndDate}
                            onChange={handleEndDateChange}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                }
                            }}
                        />
                    </div>
                </MuiPickersUtilsProvider>

                <div className={classes.wrapper}>
                    <h3 className={classes.label}>Reason: </h3>
                    <TextField
                        id="standard-basic"
                        value={selectedReason}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        className={classes.textField}
                        onChange={(event) => {setSelectedReason(event.target.value)}}
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
                        endIcon={<Icon>send</Icon>}
                        onClick={submitRequest}
                    >
                        Send request
                    </Button>
                </div>
            </Grid>
        </div>
    )
}

export default RequestForm;
