import React from 'react';
import Card from '@material-ui/core/Card';
import { Button, CardHeader, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import config from '../../config';
import Container from '@material-ui/core/Container';

const globUrl = `${config.API_URL}/rentals`;
const carsUrl = `${config.API_URL}/cars/`;
const usersUrl = `${config.API_URL}/users/`;




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
            rentals: {},
            users: {},
            cars: {}
        };
    }


    render () {
        return(
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="carsPageHeader">
                    <h1 className="carsPageTitle">Car rental requests</h1>
                </div>

                <Container className="mainContent">
                    <div className="rentals" style={mainStyle}>
                    {this.isLoaded &&
                    // Render first: rentals with the state 'requested'
                            this.state.rentals.filter(rental => rental.state === 'requested' && rental.deleted === false).
                                    map((rental, index) => {
                                        return this.renderRental(rental);
                            })
                            .concat(
                            this.state.rentals.filter(rental => rental.state !== 'requested' && rental.deleted === false).
                                    map((rental, index) => {
                                        return this.renderRental(rental);
                            }))
                    }
                    </div>
                </Container>
            </Grid>
        )
    }
    async loadAllRentals() {
            await fetch(globUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result && result.success !== false) {
                        this.isLoaded = true;
                        this.setState({
                            rentals: result.data,
                            users: this.state.users,
                            cars: this.state.cars
                        });
                    }
                },
                (error) => {
                    this.isLoaded = false;
                    this.error = error;
                }
            );
    }

    async loadAllUsers() {
        let url = `${usersUrl}`;
        
        await fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                if (result && result.success !== false) {
                    this.usersLoaded = true;
                    this.setState({
                        users: result.data,
                        rentals: this.state.rentals,
                        cars: this.state.cars
                    });
                }
            },
            (error) => {
                this.isLoaded = false;
                this.error = error;
            }
        );
    }

    async loadAllCars() {
        let url = `${carsUrl}`;

        await fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                if (result && result.success !== false) {
                    this.carsLoaded = true;
                    console.log(result.data);
                    this.setState({
                        cars: result.data,
                        users: this.state.users,
                        rentals: this.state.rentals
                    });
                }
            },
            (error) => {
                this.isLoaded = false;
                this.error = error;
            }
        );
    }
    async updateRental(rental) {
        const response = await fetch(globUrl + '/' + rental.id, {
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
        return response;
    }

    async componentDidMount() {
        await this.loadAllRentals();
        await this.loadAllUsers();
        await this.loadAllCars();
    }


    async approveOrder(rental) {
        rental.state = 'approved';
        return await this.updateRental(rental);
    }

    async disproveOrder(rental) {
        rental.state = 'declined';
        return await this.updateRental(rental);
    }


    get_user(id) {
        if (!this.usersLoaded)
            return {name: "UserNotFound"};

        for ( let user of this.state.users ) {
            console.log(user);
            if ( user.id === id )
                return user;
        }

        return {name: "UserNotFound"};
    }

    get_car(id) {
        if (!this.carsLoaded)
            return {manufacturer: "NotFound", model: "NotFound"};
        for ( let car of this.state.cars) {
            if ( car.id === id ) 
                return car;
        }

        return {manufacturer: "NotFound", model: "NotFound"};
    }

    formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

    renderRental(rental) {
        let car = this.get_car(rental.carId);
        let user = this.get_user(rental.userId);
        const carPicture = car.image
        ? car.image
        : "https://ci.catcar.info/opel_2015_05/data/NO_IMAGE12.jpg";

        let rentalStyle = {}
        let cardTitle = `${car.manufacturer} ${car.model} by user ${user.name}`;

        let startDate = this.formatDate(new Date(Date.parse(rental.startDate)));
        let endDate = this.formatDate(new Date(Date.parse(rental.endDate)));

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
        

        return (
            <Card className="rental" key={rental.id} style={{...rentalStyle, ...cardStyle}}>
                {/* TODO: Here we should render a separate component that handles car details.. */}
                <CardHeader title={cardTitle}>
                </CardHeader>

                <CardContent>
                    <img className="imag" src={carPicture} width="160" height="80" alt="car_photo"/>
                    <Typography component="h1" variant="h4">
                        Details for the rental request:
                    </Typography>


                    <Typography component="h5" variant="h5">
                        {rental.details}
                    </Typography>

                    <br></br>
                    <Typography component="h1" variant="h4">
                        Period for which the rental is requested:
                    </Typography>
                    <Typography component="h4" variant="h5">
                        {startDate}
                    </Typography>
                    <Typography component="h4" variant="h5">
                        {endDate}
                    </Typography>
                </CardContent>
                <CardContent>
                    {this.rentalButton(rental)}
                </CardContent>
            </Card>
        );
    }
    rentalButton(rental) {
        if ( rental.state === "approved" )
            return (
                <Button variant="contained" size="large" onClick={() => { this.disproveOrder(rental) }}>
                    Disprove order
                </Button>
            );
        if ( rental.state == "declined" )
            return (
                <Button variant="contained" size="large" onClick={() => { this.approveOrder(rental) }}>
                    Approve order
                </Button>
            );
        if ( rental.state == "requested" )
            return (
                <div>
                    <Button variant="contained" size="large" onClick={() => { this.disproveOrder(rental) }}>
                        Disprove order
                    </Button>
                    <Button variant="contained" size="large" onClick={() => { this.approveOrder(rental) }}>
                        Approve order
                    </Button>
                </div>
            );
    }
}

export default AdminRequests;
