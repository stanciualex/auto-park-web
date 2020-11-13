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
import MuiAlert from '@material-ui/lab/alert';

const axios = require('axios').default

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


const RequestForm = (props) => {
    var car = props.content;
    const classes = useStyles();

    const [selectedStartDate, setSelectedStartDate] = React.useState(Date.now());
    const [selectedEndDate, setSelectedEndDate] = React.useState(Date.now())

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
            details: 'Reason',
            state: 'Requested',
            deleted: false
        };
        axios.post('http://192.168.0.163:8000/rentals', request).then(function(response){
            console.log(response);
            props.closeAction();
        }).catch(function(error){
            console.log(error);
        })
    }

    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography class="modal-title">Request for {car.manufacturer} {car.model}</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select start date" value={selectedStartDate} onChange={handleStartDateChange} KeyboardButtonProps={{'aria-label': 'change date'}}/>
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" label="Select end date" value={selectedEndDate} onChange={handleEndDateChange} KeyboardButtonProps={{'aria-label': 'change date'}}/>
                </MuiPickersUtilsProvider>
                <TextField id="standard-basic" label="Reason" />
                <Button className={classes.button} variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={submitRequest}>Send request</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={props.closeAction}>Cancel</Button>
            </Grid>
        </div>
    )
}

export default RequestForm;