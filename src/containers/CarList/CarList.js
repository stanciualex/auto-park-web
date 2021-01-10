import React, {Component} from 'react'
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

const baseUrl ='http://localhost:8000'
const carUrl = `${baseUrl}/cars`

class CarList extends Component{

    constructor(props){
        super(props);
        this.state = {
            cars: [],
            search: '',
        }
    }

    getCars(){
        axios.get(carUrl)
            .then(response => {
                this.setState({cars: response.data.data})
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getCars()
    }

    handleAddCar(){
    }

    onSearchChange = (event) => {
        const { value } = event.target;

        this.setState({
            search: value,
        })
    }

    applyFilters(cars) {
        if (!cars) {
            return [];
        }

        const search = this.state.search.toLowerCase();

        if (!search) {
            return cars;
        }

        return cars.filter(car => {
            const searchTerm = `${car.manufacturer} ${car.model} ${car.color} ${car.engine} ${car.licencePlate}`.toLowerCase();

            return searchTerm.includes(search);
        });
    }

    render(){
        const cars = this.applyFilters(this.state.cars);

        return(
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="carsPageHeader">
                    <h1 className="carsPageTitle">Cars</h1>
                    <TextField
                        id="input-with-icon-textfield"
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={this.onSearchChange}
                        value={this.state.search}
                    />
                    {this.props.user.role === 'admin' && <AddCar/>}
                </div>
                <Container className="mainContent">
                    {cars.map((car) => <Car key={car.id} content={car}/>)}
                    {cars.length === 0 && <div>Empty cars list.</div>}
                </Container>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(CarList);
