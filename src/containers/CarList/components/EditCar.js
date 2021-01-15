import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import EditCarForm from "./EditCarForm";
import {connect} from "react-redux";

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
    },
    button: {
        fontSize: '20px',
        padding: '15px 25px'
    }
}));

const EditCar = (user) => {
    const [open, setOpen] = React.useState(false)
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const isAdmin = () => {
        return user.user.role == 'admin'
    }

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <Box p={2}>
                {isAdmin && <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {handleOpen()}}
                >
                    Edit car
                </Button>}
            </Box>
            <Modal className={classes.modal} open={open} onClose={handleClose} closeAfterTransition
                   BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <EditCarForm content={user.content} onModify={() => user.onModify()} closeAction={handleClose}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
        user: state.auth.user,
    });


export default connect(mapStateToProps)(EditCar);
