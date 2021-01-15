import React from 'react';
import { Button } from '@material-ui/core';

function RentalButton(props) {
    console.log("render rental button")

    if ( props.rental.state === "approved" )
        return (
            <Button variant="contained"
                    size="large"
                    onClick={() => {props.disproveOrder(props.rental);}}>
                Disprove order
            </Button>
        );
    else
        return (
            <Button variant="contained"
                    size="large"
                    onClick={() => {props.approveOrder(props.rental);}}>
                Approve order
            </Button>
        );
} 

export default RentalButton;