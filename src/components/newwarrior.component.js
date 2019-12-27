import React, { Component } from 'react';
import axios from 'axios'
import { Command, Add, Dat, Div, Djn, Jmn,
    Jmp, Jmz, Mod, Mov, Mul, Seq,
    Slt, Sne, Spl, Sub } from "./corewars/instructions";

const cmdkey = {
    'Mov': Mov,
    'Add': Add,
    'Dat': Dat,
    'Div': Div,
    'Djn': Djn,
    'Jmn': Jmn,
    'Jmp': Jmp,
    'Jmz': Jmz,
    'Slt': Slt,
    'Sne': Sne,
    'Spl': Spl,
    'Sub': Sub,
    'Mod': Mod,
    'Mul': Mul,
    'Seq': Seq,
    // 'Command': Command
}

const memory_size = 625;
const maxCommands = 15

const renderCommand = (cmdToRender) => {
    return(
        <a className="dropdown-item" href="#">{cmdToRender}</a>
    )
}
const displayCommands = (max)=>{
    var listCommands = []
    for (var i = 0; i <max; i++) {
        listCommands.push(renderCommand(Object.keys(cmdkey)[i]))
    }
    return({listCommands})
}

const Input = () => {
    return(
        <div className='container'>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Edit the next command here!</h4>
                    {/*inline form*/}
                    <form className="form-inline" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        value={this.state.cmd} onChange={this.onChangeCmd}>
                                    Command
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {displayCommands(maxCommands)}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input type="password" className="form-control" id="pwd"> </input>
                        </div>
                        <div className="checkbox">
                            <label><input type="checkbox"> Remember me</input></label>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                    {/*<p className="card-text">Some example text. Some example text.</p>*/}
                    {/*<a href="#" className="card-link">Card link</a>*/}
                </div>
            </div>
        </div>
    )
}

export default class NewWarriorComponent extends Component {

    constructor(props){
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onRun = this.onRun.bind(this)


        this.state = {
            name: '',
            commandList: [],
            dateCreated: new Date(),
            warriors:[],
            //command specific
            cmd:'',
            a:'',
            b:'',
            a_am:'',
            b_am:'',
            mod:'',
        }
    }

    componentDidMount() {
        // grabbing info for testing dropdown
        axios.get('http://localhost:3000/play/add/')
            .then( (response) => {
                if (response.data.length >0){
                    this.setState({
                        warriors: response.data
                    })
                }
            })
            .catch(err=>console.log(err))
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeCmd(e){
        this.setState({
            cmd:e.target.value
        })
    }


    onRun(e){

    }
    onSave(e){
        e.preventDefault()
        const Warrior = {
            name: this.state.name,
            dateCreated: this.state.dateCreated,
            commandList: this.state.commandList,
        }
        console.log(Warrior)
        axios.post('http://localhost:3000/play/add/', Warrior)
            .then(res=> console.log(res.data))
        window.location = '/'
    }
    onSubmit(e){
        var newCommandList = this.state.commandList
        const newCmd = new cmdkey[this.state.cmd](
            this.state.a,
            this.state.b,
            this.state.a_am,
            this.state.b_am,
            this.state.mod,
            memory,
            memory_size,
        )
        newCommandList.push(newCmd)
        // grab current state for commmandlist, push, set new state
        // will be used in individual submits of warrior
        //
        this.setState({
            commandList: newCommandList,
            cmd:'',
            a:'',
            b:'',
            a_am:'',
            b_am:'',
            mod:'',
            // set other cmd values to restart
        })


        //
    }



    render(){
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}