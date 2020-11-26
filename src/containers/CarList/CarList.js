import React, {Component} from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Car from './components/Car'
import AddCar from "./components/AddCar";

const baseUrl ='http://192.168.0.163:8000'
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
                <AddCar/>
                <Container style={{width: '60%'}}>
                    {this.state.cars.map((car) => <Car key={car.id} content={car}/>)}
                </Container>
            </Grid>
        )
    }
}

export default CarList;