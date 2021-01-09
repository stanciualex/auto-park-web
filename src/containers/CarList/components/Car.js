import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from '@material-ui/core/Button'
import CarCard from './Card'
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import RequestForm from "./RequestForm";
import '@date-io/date-fns'
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    accordionTitle: {
        paddingLeft: '18px',
        paddingTop: '22px'
    }
}));

const Car = (props) => {

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const id = props.content.id;
    const car = props.content;

    return(
        <div className='carItem'>
            <Accordion expanded={expanded === id} onChange={handleChange(id)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container direction="row" alignItems="flex-start">
                        <div className="div1">
                            <img className="imag" src="https://www.downloadclipart.net/medium/car-transparent-background.png" width="160" height="80" alt="car_photo"/>
                        </div>
                        <Typography variant="h3" className={classes.accordionTitle}>{car.manufacturer} {car.model}</Typography>
                    </Grid>

                </AccordionSummary>
                <AccordionDetails style={{justifyContent: 'center'}}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <CarCard content={car} />
                        <Button variant="contained" color="primary" style={{ fontSize: '15px' }} onClick={handleOpen}>Send request</Button>
                    </Grid>
                    <Modal className={classes.modal} open={open} onClose={handleClose} closeAfterTransition
                           BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <RequestForm content={car} closeAction={handleClose}/>
                            </div>
                        </Fade>
                    </Modal>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Car
