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

    constructor(){
        super()
        this.state = {
            warriors:[]
        }
    }


    componentDidMount() {
        // what we are doing here: getting pre-existing user information via axios,
        console.log(this.state.warriors)
        axios.get('http://localhost:3000/play/')
            .then((response) => {this.setState({warriors: response.data})
            })
            .catch(err=>console.log(err))
        console.log(this.state.warriors);
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
                        <h3>Leaderboard  📈  </h3>
                        <table className="table shadow">
                            <thead className="thead-light">
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

                        <h3>Warrior (+ 1)</h3>
                        <Link to="/play/new/">
                            <button type="button" className="btn btn-outline-success">+1</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

