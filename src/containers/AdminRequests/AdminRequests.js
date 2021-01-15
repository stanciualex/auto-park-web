import React from 'react';
import Card from '@material-ui/core/Card';
import { Button, CardHeader, CardContent, TextField, Box} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import config from '../../config';
import Car from '../CarList/components/Car';
import RentalButton from './components/RentalButton';

const serverUrl = `${config.API_URL}`;
const rentalsGetAllURL = `${serverUrl}/rentals`;
const usersGetAllURL = `${serverUrl}/users`;
const carsGetAllURL = `${serverUrl}/cars`;



const mainStyle = {
    padding: "1em",
    overflow: 'scroll',
    height: '70vh'
}

const cardStyle = {
    margin: "0.3em"
}

const rejectedStyle = {
    borderLeft: "12px solid red"
}
const acceptedStyle = {
    borderLeft: "12px solid green"
}
const waitingStyle = {
    borderLeft: "12px solid grey"
}


class AdminRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: {},
            rentals: {},
            users: {}
        };
    }


    render () {
        return(
            <Box>
            {this.isLoaded &&
                // render first: rentals with the state 'requested'
                this.state.rentals.filter(rental => rental.state === 'requested').
                        map((rental, index) => {
                            return this.renderRental(rental, index);
                })
                .concat(
                this.state.rentals.filter(rental => rental.state !== 'requested').
                        map((rental, index) => {
                            return this.renderRental(rental, index);
                }))
            }
            </Box>
        )
    }
    loadAllRentals() {
        console.log("loadAllRentals");
        fetch(rentalsGetAllURL)
        .then(res => res.json())
        .then(
            (result) => {
                if (result && result.success !== false) {
                    this.isLoaded = true;
                    this.setState({
                        rentals: result.data
                    });
                    this.loadCarsDetails();
                    this.loadUsersDetails();
                }
            },
            (error) => {
                this.isLoaded = false;
                this.error = error;
            }
        );
    }
    loadUsersDetails() {}
    loadCarsDetails() {
        fetch(carsGetAllURL)
        .then(res => res.json())
        .then(
            (res) => {
                var cars = {};
                for ( var i in res.data) {
                    cars[res.data[i].id] = res.data[i];
                }
                this.setState({cars: cars});
                console.log(res.data.length);
            },
            (res) => {
                console.log("Could not load car details");
            }
        );
    }

    async updateRental(rental) {
        // Await is for making sure we update rentals AFTER fetch has completed
        await fetch(rentalsGetAllURL + '/' + rental.id, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(rental) // body data type must match "Content-Type" header
        });
        this.loadAllRentals();
    }
<<<<<<< HEAD


    return (
        <Card className="rental" key={rental.id} style={{...rentalStyle, ...cardStyle}}>
            {/* TODO: Here we should render a separate component that handles car details.. */}
            <CardHeader title={cardTitle}>
            </CardHeader>

            <CardContent>
                <Typography component="h5" variant="h5">
                    {rental.details}
                </Typography>
                <Typography component="h4" variant="h5">
                    {rental.startDate}
                </Typography>
                <Typography component="h4" variant="h5">
                    {rental.endDate}
                </Typography>
            </CardContent>
            <CardContent>
                <RentalButton rental={rental}></RentalButton>
            </CardContent>
        </Card>
    );
}
=======
>>>>>>> 6fc385e (Refactor)

    componentDidMount() {
        this.loadAllRentals();
    }

    approveOrder(rental) {
        rental.state = 'approved';
        this.updateRental(rental);
    }

    disproveOrder(rental) {
        rental.state = 'declined';
        this.updateRental(rental);
    }
    renderRental(rental, index) {
        console.log("renderRental");
        let rentalStyle = {}
        let cardTitle = "car with id: " + rental.carId + " by user " + rental.userId;

        if ( rental.state === 'requested' ) {
            rentalStyle = waitingStyle;
            cardTitle = "Request for " + cardTitle;
        }
        else if (rental.state === 'approved') {
            rentalStyle = acceptedStyle;
            cardTitle = "Accepted rental for " + cardTitle;
        }
        else if (rental.state === 'declined') {
            rentalStyle = rejectedStyle;
            cardTitle = "Declined rental for " + cardTitle;
        }

        var carDetails = <div>Loading car details...</div>;
        
        if ( rental.carId in this.state.cars )
            carDetails = <Car key={rental.carId} content={this.state.cars[rental.carId]}/>;
        
        let startDate = rental.startDate.split('T')[0];
        let startTime = rental.startDate.split('T')[1].substring(0, 5);
        let endDate = rental.endDate.split('T')[0];
        let endTime = rental.endDate.split('T')[1].substring(0, 5);
        
        return (
            <Card className="rental" key={rental.id} style={{...rentalStyle, ...cardStyle}}>
                {/* TODO: Here we should render a separate component that handles car details.. */}
                <CardHeader title={cardTitle}>
                </CardHeader>

                <CardContent>
                        <CardContent>
                            {carDetails}
                        </CardContent>
                    <Card>
                        <CardHeader>Rental Details</CardHeader>
                            {rental.details}
                    </Card>
                    <Card style={{padding: 10 + 'px'}} >
                        <TextField
                            label="Start Date"
                            type="date"
                            defaultValue={startDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Start Time"
                            type="time"
                            defaultValue={startTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br/>
                        <TextField
                            label="End Date"
                            type="date"
                            defaultValue={endDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="End Time"
                            type="time"
                            defaultValue={endTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Card>
                </CardContent>
                <CardContent>
                    <RentalButton
                        rental={rental}
                        approveOrder={ (rental) => { this.approveOrder(rental); } }
                        disproveOrder={ (rental) => { this.disproveOrder(rental); } }/>
                </CardContent>
            </Card>
        );
    }
}

export default AdminRequests;
