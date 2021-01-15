import React, {useEffect, useState} from 'react'
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
import config from '../../../config'
import { connect } from 'react-redux';

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
    const [loading, setLoading] = React.useState(false);
    const [otherRentals, setOtherRentals] = useState([]);

    useEffect(() => {
        setLoading(true);
        getRentalsForCurrentCar(car.id);
    }, []);

    const getRentalsForCurrentCar = (id) => {
        axios.get(`${config.API_URL}/rentals/carId/${id}`)
            .then(response => {
                console.log('response', response);
                setOtherRentals(response.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date)
    }

    const submitRequest = () => {
        const request = {
            carId: car.id,
            userId: props.user.id,
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

    const shouldDisableDate = (date) => {
        return !!otherRentals.find(rental => {
            const start = new Date(rental.startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(rental.endDate);
            end.setHours(0, 0, 0, 0);

            return start <= date && date <= end;
        })
    };

    if (loading) {
        return <div>Loading...</div>;
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
                            shouldDisableDate={shouldDisableDate}
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
                            shouldDisableDate={shouldDisableDate}
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

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(RequestForm);
