import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'



const Warrior = (props) => {
    return(
        <tr>
            <td>{props.warrior.name}</td>
            <td>{props.warrior.commandList.length}</td>
            <td>{props.warrior.date.substring(0,10)}</td>
            {/*<Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>*/}
        </tr>
    )
}

export default class WarriorsComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            warriors:[]
        }
    }


    componentDidMount() {
        // what we are doing here: getting pre-existing user information via axios,
        axios.get('http://localhost:3000/play/')
            .then( (response) => {
                if (response.data.length >0){
                    this.setState({
                        warriors: response.data
                    })
                }
            })
            .catch(err=>console.log(err))
    }

    // add in deleting warriors if desirable

    warriorListFunc(){
        this.state.warriors.map(currentWarrior => {
            return(<Warrior warrior={currentWarrior}/>)
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row" >
                    <div className="col-6">
                        <h3>Logged Warriors</h3>
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Length</th>
                                <th>Date created</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.warriorListFunc() }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">

                        <h3>Create a New Warrior here!</h3>
                        <Link to="/play/new/">
                            <button type="button" className="btn btn-success">+1</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

