import React, { Component } from 'react';
import axios from 'axios'
import { Command, Add, Dat, Div, Djn, Jmn,
    Jmp, Jmz, Mod, Mov, Mul, Seq,
    Slt, Sne, Spl, Sub } from "./corewars/instructions";
import PlayComponent from './play.component'

// string to command dictionary
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



// const maxCommands = 15
// prob not needed
// const renderCommand = (cmdToRender) => {
//     return(
//         <a className="dropdown-item" href="#">{cmdToRender}</a>
//     )
// }
// const displayAvailableCommands = (max)=>{
//     var listCommands = []
//     for (var i = 0; i <max; i++) {
//         listCommands.push(renderCommand(cmdkey[i]))
//     }
//
//     return({listCommands})
// }
const memory_size = 625;


const displayChosenInstructions = (commandList) => {
    // var instructionList = []
    // for (var inc = 0; inc < commandList.length; inc ++) {
    //     // instructionList.push(renderInstruction(commandList[inc]))
    //     instructionList.push(commandList[inc]);
    // }
    return(
        <div>
            {commandList.map(instruction =>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{instruction.values().name}</h4>
                        <p className="card-text">a_am: <b>{instruction.values().a_am}</b> | a: <b>{instruction.values().a}</b> | b_am: <b>{instruction.values().b_am}</b> | b: <b>{instruction.values().b}</b> | mod: <b>{instruction.values().mod}</b></p>
                        {/*add in buttons to delete, new delete function, how do you execute commands? */}
                        {/*add in / edit?? */}
                    </div>
                </div>
            )}
        </div>
    )
}

// const CmdInput = () => {
//     return(
//
//     )
// }

export default class NewWarriorComponent extends Component {

    constructor(props){
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onRun = this.onRun.bind(this)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangea = this.onChangea.bind(this)
        this.onChangeb = this.onChangeb.bind(this)
        this.onChangea_am = this.onChangea_am.bind(this)
        this.onChangeb_am = this.onChangeb_am.bind(this)
        this.onChangeMOD = this.onChangeMOD.bind(this)
        this.onChangeCmd = this.onChangeCmd.bind(this)





        // add more this binds

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
            runBool: false,
        }
    }

    componentDidMount() {
        // grabbing info for testing dropdown
        axios.get('http://localhost:3000/play/new/')
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

    onChangea(e){
        this.setState({
            a:e.target.value
        })
    }
    onChangeb(e){
        this.setState({
            b:e.target.value
        })
    }
    onChangea_am(e){
        this.setState({
            a_am:e.target.value
        })
    }
    onChangeb_am(e){
        this.setState({
            b_am:e.target.value
        })
    }
    onChangeMOD(e){
        this.setState({
            MOD:e.target.value
        })
    }

    onChangeCmd(e){
        this.setState({
            cmd:e.target.value
        })
    }


    onRun(e){
        this.setState({
            runBool: !this.state.runBool,
        })
    }
    onSave(e){
        e.preventDefault()
        const Warrior = {
            name: this.state.name,
            dateCreated: this.state.dateCreated,
            List: this.state.commandList,
        }
        console.log(Warrior)
        axios.post('http://localhost:3000/play/new/', Warrior)
            .then(res=> console.log(res.data))
        window.location = '/'
    }

    //dummy function
    onSubmitName(e){}

    onSubmit(e){
        e.preventDefault()
        console.log(this.state.a)
        var newCommandList = this.state.commandList
        console.log(newCommandList)
        switch (this.state.cmd){
            case 'Mov': newCommandList.push(new Mov(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Add': newCommandList.push(new Add(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Dat': newCommandList.push(new Dat(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Div': newCommandList.push(new Div(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Djn': newCommandList.push(new Djn(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Jmn': newCommandList.push(new Jmn(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Jmp': newCommandList.push(new Jmp(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Jmz': newCommandList.push(new Jmz(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Slt': newCommandList.push(new Slt(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Sne': newCommandList.push(new Sne(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Spl': newCommandList.push(new Spl(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Sub': newCommandList.push(new Sub(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Mod': newCommandList.push(new Mod(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Mul': newCommandList.push(new Mul(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Seq': newCommandList.push(new Seq(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
        }
        console.log(newCommandList)
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
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h1>Create A New Warrior</h1>
                        <br />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <form onSubmit={this.onSubmitName} className='form-inline'>
                            <label> Name Your Warrior: </label>
                            <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='Warrior 1' value={this.state.name} onChange={this.onChangeName} />
                            <button type="submit" className="btn btn-success ml-2 mb-2 mr-sm-2">Save Name</button>
                        </form>

                        <div className="card shadow rounded">
                            <div className="card-body">
                                <h4 className="card-title">Your Warrior </h4>
                                {displayChosenInstructions(this.state.commandList)}
                            </div>
                        </div>
                        <br />

                        <div className="card shadow rounded">
                            <div className="card-body">
                                <h4 className="card-title">Edit the next command here!</h4>
                                {/*inline form*/}
                                <form onSubmit={this.onSubmit}>
                                    <div className='form-inline'>
                                        <div className='form-group'>
                                            <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='Instruction (Mov)' value={this.state.cmd} onChange={this.onChangeCmd} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='Modifier (I)' value={this.state.MOD} onChange={this.onChangeMOD} />
                                        </div>
                                    </div>
                                    <div className='form-inline'>
                                        <div className="form-group">
                                            <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='A_AM ($)' value={this.state.a_am} onChange={this.onChangea_am} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='A (0)' value={this.state.a} onChange={this.onChangea} />
                                        </div>
                                    </div>
                                    <div className='form-inline'>
                                        <div className="form-group">
                                            <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='B_AM ($)' value={this.state.b_am} onChange={this.onChangeb_am} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='B (1)' value={this.state.b} onChange={this.onChangeb} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success ml-2 mb-2 mr-sm-2">Submit</button>

                                </form>
                            </div>
                        </div>
                        <br />
                        <button type="button" onClick={this.onSave} className="btn btn-success shadow">When Finished, Save Your Warrior!</button>
                    </div>
                    <div className='col-md-6'>
                        <h3>Test Your Warrior Here</h3>
                        <PlayComponent p2code={this.state.commandList}/>
                        {/*// todo this isn't the correct implementation of the play component; we need to have the warriors from our state factor into that play component hmmmmmm*/}
                    </div>
                </div>
            </div>
        )
    }
}