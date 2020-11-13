import React, {Component} from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Car from './components/Car'

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

    render(){
        return(
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center">
                <Container style={{width: '60%'}}>
                    {this.state.cars.map((car) => {
                        return(<div>
                                <Car content={car}/>
                            </div>)
                    })}
                </Container>
            </Grid>

        )
    }
}

export default CarList;