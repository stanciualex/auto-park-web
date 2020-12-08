import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {makeStyles} from "@material-ui/core/styles";
import AddUserForm from "./AddUserForm";

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

const AddUser = (props) => {
  const [showModal, setShowModal] = useState(false)
  const classes = useStyles();

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    props.refreshState();
  }

  return (
    <div>
      <Box p={2}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Invite user
        </Button>
      </Box>
      <Modal
          className={classes.modal}
          open={showModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{timeout: 500,}}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>
            <AddUserForm closeAction={handleCloseModal}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddUser;
