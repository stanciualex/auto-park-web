import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Button, CardHeader, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import config from '../../config';

const globUrl = `${config.API_URL}/rentals`;
let setRentalsG, setErrorG, setIsLoadedG;
async function loadAllRentals(setRentals, setError, setIsLoaded) {
        fetch(globUrl)
        .then(res => res.json())
        .then(
            (result) => {
                if (result && result.success !== false) {
                    setIsLoadedG(true);
                    setRentalsG(result.data);
                }
            },
            (error) => {
                setIsLoadedG(true);
                setErrorG(error);
            }
        )
}

async function approveOrder(rental) {
    rental.state = 'approved';
    return await updateRental(rental);
}
async function disproveOrder(rental) {
    rental.state = 'declined';
    return await updateRental(rental);
}

async function updateRental(rental) {
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
    loadAllRentals();
    return response;
}

const mainStyle = {
    padding: "1em"
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

function RentalButton(props) {
    if ( props.rental.state === "approved" )
        return (
            <Button variant="contained" size="large" onClick={() => { disproveOrder(props.rental) }}>
                Disprove order
            </Button>
        );
    else
        return (
            <Button variant="contained" size="large" onClick={() => { approveOrder(props.rental) }}>
                Approve order
            </Button>
        );
}

function renderRental(rental, index) {
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
                <RentalButton rental={rental}></RentalButton>
            </CardContent>
        </Card>
    );
}

const AdminRequests = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rentals, setRentals] = useState([]);
    setErrorG = setError;
    setIsLoadedG = setIsLoaded;
    setRentalsG = setRentals;

    useEffect(
        () => {loadAllRentals(setRentals, setError, setIsLoaded)},
        []);


    return (
        <div className="rentals" style={mainStyle}>
        {isLoaded &&
        // Render first: rentals with the state 'requested'
                rentals.filter(rental => rental.state === 'requested').
                        map((rental, index) => {
                            return renderRental(rental, index);
                })
                .concat(
                rentals.filter(rental => rental.state !== 'requested').
                        map((rental, index) => {
                            return renderRental(rental, index);
                }))
        }
        </div>
    );
}

export default AdminRequests;