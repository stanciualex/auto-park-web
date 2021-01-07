import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import {login as loginAction, logout as logoutAction} from "../../redux/actions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const axios = require('axios').default

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const ProfilePage = ({user, isAuthenticated}) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState(isAuthenticated ?  user.firstName : '');
    const [lastName, setLastName] = useState(isAuthenticated ? user.lastName :  '');
    const [jobTitle, setJobTitle] = useState(isAuthenticated ? user.jobTitle :  '');

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user])
    const updateProfile = () => {
        const req = {
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
        };
        axios.put(`http://localhost:8000/users/${user.id}`, req).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    }

    return (
        <div className="profile">
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h5" style={{fontSize: "25px", marginTop: "20px"}}>My Profile</Typography>
                {isAuthenticated ? (
                    <div className="profile-component">
                        <TextField required id="standard-required" style={{margin: "20px 0", width: "250px"}} label="First Name" defaultValue={user.firstName} onChange={(event) => {setFirstName(event.target.value)}} />
                        <TextField required id="standard-required" style={{margin: "20px 0"}} label="Last Name" defaultValue={user.lastName} onChange={(event) => {setLastName(event.target.value)}} />
                        <TextField
                            id="standard-read-only-input"
                            label="Email"
                            defaultValue={user.email}
                            style={{margin: "20px 0"}}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField required id="standard-required" style={{margin: "20px 0"}} label="Job Title" defaultValue={user.jobTitle} onChange={(event) => {setJobTitle(event.target.value)}} />
                        <Button className={classes.button} variant="contained" color="primary" onClick={updateProfile}>Update Profile</Button>
                    </div>
                ) : (
                    <div className="profile-component">Please log in</div>
                )}
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user,
    user: state.user,
});

export default connect(mapStateToProps, {
    login: loginAction,
    logout: logoutAction,
})(ProfilePage);
