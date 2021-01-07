import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/actions';
import { bindActionCreators } from 'redux';
import state from '../../redux/reducers';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://www.mercedes-benz.com/en/vehicles/passenger-cars/e-class/mbsocialcar-mercedes-amg-e-63-s-4matic/_jcr_content/root/slider_0/sliderchilditems/slideritem_0/image/MQ7-0-image-20190114123124/09-mercedes-amg-e-63-s-4matic-saloon-w213-3400x1440.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(15, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#DD004E',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),

    },
    submit: {
        margin: theme.spacing(4, 0, 2),
        backgroundColor: '#1877D2',
        fontSize: '18px',
    },
    title: {
        fontSize: '20px',
    }
}));

const SignInSide = (props) => {
    const classes = useStyles();
    const [loginData, setLoginData] = useState({
        email: {
            type: 'text',
            label: 'Email',
            name: 'email',
            value: '',
            error: '',
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            value: '',
            error: '',
        },
    });

    const schema = {
        email: Joi.string().required().email({ minDomainAtoms: 2 }).label('Email'),
        password: Joi.string().required().min(8).label('Password'),
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const user = {
            email: loginData.email.value,
            password: loginData.password.value,
        };
        let formIsValid = true;
        const result = Joi.validate(user, schema, { abortEarly: false });

        const loginDataClone = { ...loginData };
        Object.keys(loginDataClone).forEach((key) => {
            loginDataClone[key].error = '';
        });

        if (result.error) {
            formIsValid = false;
            result.error.details.forEach((err) => {
                loginDataClone[err.path[0]].error = err.message.replaceAll('"', '');
            });
        }
        setLoginData(loginDataClone);

        if (formIsValid) {
            props.onLogin(user);
        }
    };

    const inputChangedHandler = (event) => {
        const { value, name } = event.target;

        setLoginData((prevState) => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                value,
            },
        }));
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.title} >
                        Login
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={inputChangedHandler}
                            error={loginData.email.error}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={inputChangedHandler}
                            error={loginData.password.error}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={submitHandler}
                        >
                           Login
                        </Button>
                        <div>{ props.errorMessage ? <p>{props.errorMessage}</p> : null}</div>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

// const mapStateToProps = (state) => ({
//     errorMessage: User.selectors.current(state).message,
//     loading: User.selectors.current(state).loading,
// });
//
// const mapStateToProps = (state) => ({
//     errorMessage: User.selectors.current(state).message,
//     loading: User.selectors.current(state).loading,
// });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onLogin: login,
}, dispatch);


export default connect(null, mapDispatchToProps)(SignInSide);
