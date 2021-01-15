import React, {useEffect} from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Car from './components/Car'
import AddCar from "./components/AddCar";
import '../../assets/scss/pages/_cars.scss';
import {connect} from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import config from '../../config'
import Modal from "../Modal";


const CarList = (user) => {

    const [cars, setCars] = React.useState([]);
    const [defaultCars, setDefaultCars] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [showPopUp, setShowPopUp] = React.useState(false);

    useEffect(() => {
        getCars();
    }, [])

    const getCars = () => {
        axios.get(`${config.API_URL}/cars`)
            .then(response => {
                setCars(response.data.data);
                setDefaultCars(response.data.data);
            })
            .catch(error => console.log(error));
    }

    const handleDelete = (id) => {
        axios.delete( `${config.API_URL}/cars/${id}`, null).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
        getCars();
    }

    const handleModify = () => {
        getCars();
    }

    const onSearchChange = (event) => {
        setSearch(event.target.value);
        setCars(applyFilters(cars));
    }

    const onSubmit = () => {
        getCars();
    }

    const applyFilters = (cars) => {
        if (!cars) {
            return [];
        }

        const sl = search.toLowerCase()

        if (!sl) {
            return defaultCars;
        }

        return defaultCars.filter(car => {
            const searchTerm = `${car.manufacturer} ${car.model} ${car.color} ${car.engine} ${car.licencePlate}`.toLowerCase();
            return searchTerm.includes(sl);
        });
    }

    const openModal = () => {
        setShowPopUp(!showPopUp);
    }

    return(
        <Grid container direction="column" justify="center" alignItems="center">
            <div className="carsPageHeader">
                <h1 className="carsPageTitle">Cars</h1>
                <TextField
                    id="input-with-icon-textfield"
                    placeholder="Search..."
                    className="searchCars"
                    InputProps={{
                      style: { fontSize: 20},
                      startAdornment: (
                          <InputAdornment position="start">
                            <Search/>
                          </InputAdornment>
                      ),
                    }}
                    onChange={onSearchChange}
                    value={search}
                />
                {user.user.role === 'admin' && <AddCar onSubmit={onSubmit}/>}
            </div>

            <Container className="mainContent">
                {cars && applyFilters(cars).map((car) => <Car
                    key={car.id}
                    content={car}
                    onRemove={handleDelete}
                    openModal={openModal}
                    onModify={handleModify}
                />)}
            </Container>
            {
                showPopUp
                && (
                    <Modal
                        title="Your request has been successfully sent!"
                        onClose={() => setShowPopUp(false)}
                    />
                )
            }
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(CarList);
