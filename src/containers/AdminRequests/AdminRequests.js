import React from 'react';
import Card from '@material-ui/core/Card';
import { Button, CardHeader, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import config from '../../config';

const globUrl = `${config.API_URL}/rentals`;



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
    render () {
        return(
            <div className="rentals" style={mainStyle}>
            {this.isLoaded &&
            // Render first: rentals with the state 'requested'
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
            </div>
        )
    }
    async loadAllRentals() {
            fetch(globUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result && result.success !== false) {
                        this.isLoaded = true;
                        this.setState({
                            rentals: result.data
                        });
                    }
                },
                (error) => {
                    this.isLoaded = false;
                    this.error = error;
                }
            )
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

    async approveOrder(rental) {
        rental.state = 'approved';
        return await this.updateRental(rental);
    }

    async disproveOrder(rental) {
        rental.state = 'declined';
        return await this.updateRental(rental);
    }
    renderRental(rental, index) {
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
        else
            return (
                <Button variant="contained" size="large" onClick={() => { this.approveOrder(rental) }}>
                    Approve order
                </Button>
            );
    }
}

export default AdminRequests;
