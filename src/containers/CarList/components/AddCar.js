import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import AddCarForm from "./AddCarForm";

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
    }
}));

const AddCar = (props) => {
    const [open, setOpen] = React.useState(false)
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <Box p={2}>
                <Button variant="contained" color="primary" onClick={() => {handleOpen()}}>Add new car</Button>
            </Box>
            <Modal className={classes.modal} open={open} onClose={handleClose} closeAfterTransition
                   BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <AddCarForm closeAction={handleClose}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default AddCar;