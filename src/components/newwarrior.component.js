import React, { Component } from 'react';
import axios from 'axios'
import { Command, Add, Dat, Div, Djn, Jmn,
    Jmp, Jmz, Mod, Mov, Mul, Seq,
    Slt, Sne, Spl, Sub } from "./corewars/instructions";
import PlayComponent from './play.component'


const memory_size = 625;


const displayChosenInstructions = (commandList, onDeleteCommand) => {
    // var instructionList = []
    // for (var inc = 0; inc < commandList.length; inc ++) {
    //     // instructionList.push(renderInstruction(commandList[inc]))
    //     instructionList.push(commandList[inc]);
    // }

    if (commandList.length === 0){}
    else {
        return (
            <div>
                {commandList.map((instruction, index) =>
                    <div className="card">
                        <div className="card-body">
                            <h4>
                                {instruction.values().name}
                                <button type="button" onClick={() => {onDeleteCommand(index)}} className="btn btn-outline-danger float-right">🗑️</button>
                            </h4>
                            <p className="card-text">a_am: <b>{instruction.values().a_am}</b> |
                                a: <b>{instruction.values().a}</b> | b_am: <b>{instruction.values().b_am}</b> |
                                b: <b>{instruction.values().b}</b> | mod: <b>{instruction.values().mod}</b></p>
                            {/*add in buttons to delete, new delete function, how do you execute commands? */}
                            {/*add in / edit?? */}
                        </div>
                    </div>
                )}
            </div>
        )
    }
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
        this.onDeleteCommand = this.onDeleteCommand.bind(this)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangea = this.onChangea.bind(this)
        this.onChangeb = this.onChangeb.bind(this)
        this.onChangea_am = this.onChangea_am.bind(this)
        this.onChangeb_am = this.onChangeb_am.bind(this)
        this.onChangemod = this.onChangemod.bind(this)
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
    onChangemod(e){
        this.setState({
            mod:e.target.value
        })
    }

    onChangeCmd(e){
        this.setState({
            cmd:e.target.value
        })
    }


    onDeleteCommand(index){
        // this command needs to delete a single command from the commandList. However, how do we pass a parameter
        // (with e, i guess) to specify which item on the list will be delted?
        // currently it will just delete the last one.
        let newCommandList = this.state.commandList.map(x => (Object.assign(Object.create( Object.getPrototypeOf(x)), x)))
        console.log("Old") 
        console.log(newCommandList) 
        console.log("Index: " + index)
        // test:
        // newCommandList = newCommandList.pop()
        newCommandList.splice(index, 1)

        // const len = newCommandList.length
        // newCommandList = newCommandList.splice(len-1, 1)
        console.log("New")
        console.log(newCommandList)
        this.setState({
            commandList: newCommandList,
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
    onSubmitName(e){
        e.preventDefault()
    }

    onSubmit(e){
        e.preventDefault()
        console.log(this.state.a)
        var newCommandList = this.state.commandList.map(x => (Object.assign(Object.create( Object.getPrototypeOf(x)), x)))
        console.log('old command list: '+newCommandList)
        console.log("A: " + this.state.a)
        console.log("Mod: " + this.state.mod)
        switch (this.state.cmd){
            case 'Move': newCommandList.push(new Mov(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Add': newCommandList.push(new Add(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Blank': newCommandList.push(new Dat(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Divide': newCommandList.push(new Div(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'DecJumpNZ': newCommandList.push(new Djn(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'JumpNZ': newCommandList.push(new Jmn(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Jump': newCommandList.push(new Jmp(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'JumpZ': newCommandList.push(new Jmz(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'SkipL': newCommandList.push(new Slt(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'SkipNE': newCommandList.push(new Sne(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Split': newCommandList.push(new Spl(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Subtract': newCommandList.push(new Sub(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Modulus': newCommandList.push(new Mod(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'Multiply': newCommandList.push(new Mul(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            case 'SkipE': newCommandList.push(new Seq(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
            default: console.log('Command : ' + this.state.cmd + ' not recognized.');
        }
        console.log('new command list.')
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
                        <h1> Create a New Warrior</h1>
                        <br />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <form onSubmit={this.onSubmitName} className='form-inline'>
                            <label> Warrior Name 🍭 : </label>
                            <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='New Warrior' value={this.state.name} onChange={this.onChangeName} />
                            <button type="submit" className="btn btn-outline-success float-right mb-2 mr-sm-2">✔️</button>
                        </form>

                        <div className="card shadow rounded">
                            <div className="card-body">
                                <h4 className="card-title ml-2">{this.state.name}'s Commands </h4>
                                {displayChosenInstructions(this.state.commandList, this.onDeleteCommand)}
                            </div>
                        </div>
                        <br />

                        <div className="card shadow rounded">
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <h4 className="card-title ml-2">Add Command</h4>
                                    <br/>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='form-inline'>
                                                <div className='form-group'>
                                                    <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='Command: (Move)' value={this.state.cmd} onChange={this.onChangeCmd} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control ml-2 mb-2 mr-sm-2" placeholder='Command Modifier: (I)' value={this.state.mod} onChange={this.onChangemod} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card mt-2'>
                                        <div className='card-body'>
                                            <div className='form-inline'>
                                                <div className="form-group">
                                                    <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='A Modifier: ($)' value={this.state.a_am} onChange={this.onChangea_am} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='A: (0)' value={this.state.a} onChange={this.onChangea} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card mt-2'>
                                        <div className='card-body'>
                                            <div className='form-inline'>
                                                <div className="form-group">
                                                    <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='B Modifier: ($)' value={this.state.b_am} onChange={this.onChangeb_am} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='B: (1)' value={this.state.b} onChange={this.onChangeb} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-outline-success float-right mt-2 ">✔️</button>
                                </form>
                            </div>
                        </div>
                        <br />
                        <button type="button" onClick={this.onSave} className="btn btn-outline-success float-right">Totally Finished? Save ✔️</button>
                        <br />
                        <br />
                        <div className='card shadow rounded'>
                            <div className='card body'>
                                <h5 className='card-title ml-2 mt-2'>Command Options</h5>
                                <p className='card-text'>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Move</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Blank</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Add</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Subtract</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Multiply</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Divide</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Modulus</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Jump</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>JumpZ</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>JumpNZ</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>DecJumpNZ</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Split</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipE</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipNE</button>
                                    <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipL</button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        {/*<h3></h3>*/}
                        <PlayComponent warriorList={this.state.warriors} p2code={this.state.commandList}/>
                    </div>
                </div>
            </div>
        )
    }
}
