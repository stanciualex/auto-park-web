import React, {Component} from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Car from './components/Car'
import AddCar from "./components/AddCar";
import '../../assets/scss/pages/_cars.scss';
import {connect} from "react-redux";

const baseUrl ='http://localhost:8000'
const carUrl = `${baseUrl}/cars`

class CarList extends Component{

    constructor(props){
        super(props);
        this.state = {
            cars: []
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

    render(){
        return(
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="carsPageHeader">
                    <h1 className="carsPageTitle">Cars</h1>
                    {this.props.user.role === 'admin' && <AddCar/>}
                </div>
                <Container className="mainContent">
                    {this.state.cars && this.state.cars.map((car) => <Car key={car.id} content={car}/>)}
                </Container>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(CarList);
