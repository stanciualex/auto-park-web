import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import { update, upload } from "../../redux/actions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {bindActionCreators} from "redux";
import image1 from '../../assets/images/user-icon.png'
import photoIcon from '../../assets/images/camera-4-128.png'
import config from '../../config'
import Modal from '../../containers/Modal/index'

const axios = require('axios').default

const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: 15,
        margin: theme.spacing(1),
    },
    resize:{
        fontSize: 20
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

const ProfilePage = ({user, isAuthenticated, update, upload, file}) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [picture, setPicture] = useState('');
    const [showSavePopUp, setShowSavePopUp] = useState(false);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setJobTitle(user.jobTitle);
            setPicture(user.picture);
        }
    }, [user])

    const updateProfile = () => {
        setShowSavePopUp(true);
        const req = {
            id: user.id,
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            picture: picture,
        };
        update(req);
    }

    const onImageUpload = async (e) => {
        const file = e.target.files && e.target.files.length > 0 && e.target.files[0];

        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('files', file);
        await upload(formData);
    };

    useEffect(() => {
        if (file) {
            setPicture(file.path);
        }
    }, [file])

    return (
        <div className="profile">
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h5" style={{fontSize: "25px", marginTop: "20px"}}>My Profile</Typography>
                {isAuthenticated ? (
                    <div className="profile-component">
                        <div className="person-image">
                            <img src={`${config.API_URL}/file/${file.path}` || image1} className="person-image__img" />
                            <div className="person-image__icon">
                                <div className="person-image__icon-background ">
                                    <label htmlFor="upload-profile-picture">
                                        <img src={photoIcon} />
                                    </label>
                                    <input
                                        id="upload-profile-picture"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={onImageUpload}
                                        accept="image/x-png,image/gif,image/jpeg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={classes.wrapper}>
                                <h3 className={classes.label}>First Name: </h3>
                                <TextField
                                    id="standard-required"
                                    required
                                    defaultValue={user.firstName}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        }
                                    }}
                                    className={classes.textField}
                                    onChange={(event) => {setFirstName(event.target.value)}}
                                />
                            </div>

                            <div className={classes.wrapper}>
                                <h3 className={classes.label}>Last Name: </h3>
                                <TextField
                                    id="standard-required"
                                    required
                                    defaultValue={user.lastName}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        }
                                    }}
                                    className={classes.textField}
                                    onChange={(event) => {setLastName(event.target.value)}}
                                />
                            </div>

                            <div className={classes.wrapper}>
                                <h3 className={classes.label}>Email: </h3>
                                <TextField
                                    id="standard-required"
                                    required
                                    defaultValue={user.email}
                                    InputProps={{
                                        readOnly: true,
                                        classes: {
                                            input: classes.resize,
                                        }
                                    }}
                                    className={classes.textField}
                                    onChange={(event) => {setLastName(event.target.value)}}
                                />
                            </div>

                            <div className={classes.wrapper}>
                                <h3 className={classes.label}>Job Title: </h3>
                                <TextField
                                    id="standard-required"
                                    required
                                    defaultValue={user.jobTitle}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        }
                                    }}
                                    className={classes.textField}
                                    onChange={(event) => {setJobTitle(event.target.value)}}
                                />
                            </div>

                            <Button className={classes.button} variant="contained" color="primary" onClick={updateProfile}>Update Profile</Button>
                            {
                                showSavePopUp
                                && (
                                    <Modal
                                        title="Your profile was successfully updated!"
                                        onClose={() => setShowSavePopUp(false)}
                                    />
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div className="profile-component">Please log in</div>
                )}
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
    isAuthenticated: !!state.auth.user,
    user: state.auth.user,
        file: {
            path: state.auth.user.picture,
        },
}};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    update: update,
    upload: upload,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
