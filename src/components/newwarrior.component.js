import React, { Component } from 'react';
import axios from 'axios'
import { Command, Add, Dat, Div, Djn, Jmn,
    Jmp, Jmz, Mod, Mov, Mul, Seq,
    Slt, Sne, Spl, Sub } from "./corewars/instructions";
import PlayComponent from './play.component'
import './corewars/canvas.component.css'
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const memory_size = 625;


const displayChosenInstructions = (commandList, onDeleteCommand, easyMode) => {
    // var instructionList = []
    // for (var inc = 0; inc < commandList.length; inc ++) {
    //     // instructionList.push(renderInstruction(commandList[inc]))
    //     instructionList.push(commandList[inc]);
    // }

    if (commandList.length === 0){}
    else {
        if (easyMode){
            return (
                <div>
                    {commandList.map((instruction, index) =>
                        <div className="card">
                            <div className="card-body">
                                <h4>
                                    {instruction.values().name}  (  {instruction.values().a}  ,  {instruction.values().b}  )
                                    <button type="button" onClick={() => {onDeleteCommand(index)}} className="btn btn-outline-danger float-right">🗑️</button>
                                </h4>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
        else{
            return (
                <div>
                    {commandList.map((instruction, index) =>
                        <div className="card">
                            <div className="card-body">
                                <h4>
                                    {instruction.values().name}.{instruction.values().mod}    (  {instruction.values().a_am}  {instruction.values().a}  ,  {instruction.values().b_am}  {instruction.values().b}  )
                                    <button type="button" onClick={() => {onDeleteCommand(index)}} className="btn btn-outline-danger float-right">🗑️</button>
                                </h4>
                                {/*<p className="card-text">a_am: <b></b> |*/}
                                {/*    a: <b></b> | b_am: <b>{instruction.values().b_am}</b> |*/}
                                {/*    b: <b>{instruction.values().b}</b> | mod: <b></b></p>*/}
                                {/*add in buttons to delete, new delete function, how do you execute commands? */}
                                {/*add in / edit?? */}
                            </div>
                        </div>
                    )}
                </div>
            )
        }


    }
}

const displayCommandCard = (debugMode, easyMode) =>{
    if (debugMode || easyMode){
        return(
            <div className='card shadow rounded'>
                <div className='card-body'>
                    <h5 className='card-title ml-2 mt-2'>Command Options</h5>
                    <div className='card-text'>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Copy</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Blank</button>
                    </div>
                    <div className='card-text'>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Add</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Subtract</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Multiply</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Divide</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Modulus</button>
                    </div>
                    <div className='card-text'>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Jump</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>JumpZ</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>JumpNZ</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>DecJumpNZ</button>
                    </div>
                    <div className='card-text'>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Split</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipE</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipNE</button>
                        <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipL</button>
                    </div>
                </div>
            </div>
        )
    }
}

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
        this.onChangeMode = this.onChangeMode.bind(this)
        this.displayInput = this.displayInput.bind(this)
        this.onChangeDebugMode = this.onChangeDebugMode.bind(this)





        // add more this binds

        this.state = {
            name: '',
            commandList: [],
            warriors:[],
            //command specific
            cmd:'',
            a:'',
            b:'',
            a_am:'',
            b_am:'',
            mod:'',
            easyMode: true,
            debugMode: true,
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

    onChangeMode(e){
        this.setState({
            easyMode: e.target.checked
        })
    }

    onChangeDebugMode(e){
        this.setState({
            debugMode: e.target.checked
        })
    }


    onDeleteCommand(index){
        // this command needs to delete a single command from the commandList. However, how do we pass a parameter
        // (with e, i guess) to specify which item on the list will be delted?
        // currently it will just delete the last one.
        let newCommandList = this.state.commandList.map(x => (Object.assign(Object.create( Object.getPrototypeOf(x)), x)))
        // console.log("Old")
        // console.log(newCommandList)
        // console.log("Index: " + index)
        // test:
        // newCommandList = newCommandList.pop()
        newCommandList.splice(index, 1)

        // const len = newCommandList.length
        // newCommandList = newCommandList.splice(len-1, 1)
        // console.log("New")
        // console.log(newCommandList)
        this.setState({
            commandList: newCommandList,
        })
    }
    onSave(e){
        e.preventDefault()
        const Warrior = {
            name: this.state.name,
            commandList: this.state.commandList,
        }
        console.log(Warrior)
        axios.post('http://localhost:3000/play/new/', Warrior)
            .then(res=> console.log(res.data))
        window.location = '/play/'
    }

    //dummy function
    onSubmitName(e){
        e.preventDefault()
    }

    onSubmit(e){
        e.preventDefault()
        var newCommandList = this.state.commandList.map(x => (Object.assign(Object.create( Object.getPrototypeOf(x)), x)))

        if (this.state.easyMode){
            // easy interpreting
            switch (this.state.cmd){
                case 'Copy': newCommandList.push(new Mov(this.state.a, this.state.b, '$', '$', 'I', memory_size)); break;
                case 'Add': newCommandList.push(new Add(this.state.a, this.state.b, '$', '$', 'AB', memory_size)); break;
                case 'Blank': newCommandList.push(new Dat(this.state.a, this.state.b, '$','$', 'F', memory_size)); break;
                // case 'Divide': newCommandList.push(new Div(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                // case 'DecJumpNZ': newCommandList.push(new Djn(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                // case 'JumpNZ': newCommandList.push(new Jmn(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                case 'Jump': newCommandList.push(new Jmp(this.state.a, this.state.b, '$', '$', 'B', memory_size)); break;
                case 'JumpZ': newCommandList.push(new Jmz(this.state.a, this.state.b, '$','$', 'B', memory_size)); break;
                // case 'SkipL': newCommandList.push(new Slt(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                // case 'SkipNE': newCommandList.push(new Sne(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                // case 'Split': newCommandList.push(new Spl(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                case 'Subtract': newCommandList.push(new Sub(this.state.a, this.state.b, '$', '$', 'AB', memory_size)); break;
                // case 'Modulus': newCommandList.push(new Mod(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                // case 'Multiply': newCommandList.push(new Mul(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                // case 'SkipE': newCommandList.push(new Seq(this.state.a, this.state.b, '$', '$', this.state.mod, memory_size)); break;
                default: console.log('Command : ' + this.state.cmd + ' not recognized.');
            }
        }
        else{

            /* accounting for default properties - doesn't work :( */
            // console.log('states a_am prior to edit'+this.state.a_am)
            // // if (this.state.a_am == '') {this.setState({a_am: '$'})}
            // // if (this.state.b_am == '') {this.setState({b_am: '$'})}
            // console.log('states a_am post edit'+this.state.a_am)


            // if (this.state.cmd === 'Jump' || this.state.cmd === 'Split'){this.setState({mod:''})}
            // if (this.state.mod=== '' && (this.state.cmd==='Add' || this.state.cmd==='Subtract'||this.state.cmd==='Divide'||this.state.cmd==='Multiply'||this.state.cmd==='Modulus')){this.setState({mod:'AB'})}
            // if (this.state.mod=== '' && (this.state.cmd==='Dat')){this.setState({})}
            // if (this.state.mod=== '' && (this.state.cmd===)){}
            // if (this.state.mod=== '' && (this.state.cmd===)){}
            // if (this.state.mod=== '' && (this.state.cmd===)){}

            switch (this.state.cmd){
                case 'Copy': newCommandList.push(new Mov(this.state.a, this.state.b, this.state.a_am, this.state.b_am, this.state.mod, memory_size)); break;
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
        }

        // console.log('new command list.')
        // console.log(newCommandList)

        //reseting
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
    }

    displayInput(){
        if (this.state.easyMode){
            return (
                <div className='row'>
                    {/*<div className='form-group col-3'>*/}
                    {/*    /!*<input required className="form-control input-group-sm" type="text" placeholder='Cmd'*!/*/}
                    {/*    /!*       value={this.state.cmd} onChange={this.onChangeCmd}/>*!/*/}
                    {/*    <TextField className='form-control' variant="outlined" label='Command' value={this.state.cmd} onChange={this.onChangeCmd} />*/}
                    {/*</div>*/}

                    <div className='form-group col-3'>
                        <InputLabel id="selectCommand">Command</InputLabel>
                        <Select
                            labelId="selectCommand"
                            id="selectCommand"
                            value={this.state.cmd}
                            onChange={this.onChangeCmd}
                            className='form-control'
                        >
                            <MenuItem value={'Blank'}>Blank</MenuItem>
                            <MenuItem value={'Copy'}>Copy</MenuItem>
                            <MenuItem value={'Add'}>Add</MenuItem>
                            <MenuItem value={'Subtract'}>Subtract</MenuItem>
                            <MenuItem value={'Jump'}>Jump</MenuItem>
                            <MenuItem value={'JumpZ'}>JumpZ</MenuItem>
                        </Select>
                    </div>

                    <div className=' col-1 '></div>
                    <div className='form-group col-2'>
                        <TextField className='form-control' variant="outlined" label='A' value={this.state.a} onChange={this.onChangea} />
                    </div>
                    <div className=' col-1 '></div>
                    <div className='form-group col-2'>
                        <TextField className='form-control' variant="outlined" label='B' value={this.state.b} onChange={this.onChangeb} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='row'>
                    <div className='form-group col-2 padding-1'>
                        <input required className="form-control input-group-sm" type="text" placeholder='Cmd'
                               value={this.state.cmd} onChange={this.onChangeCmd}/>
                    </div>
                    <div className='form-group col-1 padding-0'>
                        <input type="text" className="form-control input-group-sm" value={this.state.mod}
                               onChange={this.onChangemod}/>
                    </div>
                    <div className='form-group col-1 padding-0'></div>
                    <div className='form-group col-1 padding-0'>
                        <input type="text" className="form-control input-group-sm" value={this.state.a_am}
                               onChange={this.onChangea_am}/>
                    </div>
                    <div className='form-group col-1 padding-0'>
                        <input type="text" required className="form-control input-group-sm" placeholder='A'
                               value={this.state.a} onChange={this.onChangea}/>
                    </div>
                    <div className='form-group col-1 padding-0'></div>
                    <div className='form-group col-1 padding-0'>
                        <input type="text" className="form-control input-group-sm" value={this.state.b_am}
                               onChange={this.onChangeb_am}/>
                    </div>
                    <div className='form-group col-1 padding-0'>
                        <input type="text" required className="form-control input-group-sm" placeholder='B'
                               value={this.state.b} onChange={this.onChangeb}/>
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <br />
                    <div className='col-6'>
                        <h1>
                            Create a New Warrior
                        </h1>

                    </div>
                    <div className='col-6'>
                        <h3 className='float-right'>
                            Beginner Mode
                            <Switch
                                checked={this.state.easyMode}
                                onChange={this.onChangeMode}
                                value="easyMode"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            Debug Mode
                            <Switch
                                checked={this.state.debugMode}
                                onChange={this.onChangeDebugMode}
                                value="debugMode"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </h3>
                    </div>
                    <br />
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
                                {displayChosenInstructions(this.state.commandList, this.onDeleteCommand, this.state.easyMode)}
                            </div>
                        </div>
                        <br />

                        <div className="card shadow rounded">
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <h4 className="card-title ml-2">Add a Command</h4>
                                    <br/>
                                    {this.displayInput()}


                                    {/*<div className='card'>*/}
                                    {/*    <div className='card-body'>*/}
                                    {/*        <div className='form-inline'>*/}
                                    {/*            <div className='form-group'>*/}
                                    {/*                <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='Command: (Copy)' value={this.state.cmd} onChange={this.onChangeCmd} />*/}
                                    {/*            </div>*/}
                                    {/*            <div className="form-group">*/}
                                    {/*                <input type="text" className="form-control ml-2 mb-2 mr-sm-2" placeholder='Command Modifier: (I)' value={this.state.mod} onChange={this.onChangemod} />*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className='card mt-2'>*/}
                                    {/*    <div className='card-body'>*/}
                                    {/*        <div className='form-inline'>*/}
                                    {/*            <div className="form-group">*/}
                                    {/*                <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='A Modifier: ($)' value={this.state.a_am} onChange={this.onChangea_am} />*/}
                                    {/*            </div>*/}
                                    {/*            <div className="form-group">*/}
                                    {/*                <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='A: (0)' value={this.state.a} onChange={this.onChangea} />*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className='card mt-2'>*/}
                                    {/*    <div className='card-body'>*/}
                                    {/*        <div className='form-inline'>*/}
                                    {/*            <div className="form-group">*/}
                                    {/*                <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='B Modifier: ($)' value={this.state.b_am} onChange={this.onChangeb_am} />*/}
                                    {/*            </div>*/}
                                    {/*            <div className="form-group">*/}
                                    {/*                <input type="text" required className="form-control ml-2 mb-2 mr-sm-2" placeholder='B: (1)' value={this.state.b} onChange={this.onChangeb} />*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <button type="submit" className="btn btn-outline-success float-right mt-2 ">✔️</button>
                                </form>
                            </div>
                        </div>
                        <br />
                        <button type="button" onClick={this.onSave} className="btn btn-outline-success float-right">Totally Finished? Save ✔️</button>
                        <br />
                        <br />
                        {displayCommandCard(this.state.debugMode, this.state.easyMode)}
                    </div>
                    <div className='col-md-6'>
                        {/*<h3></h3>*/}
                        <PlayComponent warriorList={this.state.warriors} p2code={this.state.commandList} easyModeBool={this.state.easyMode} debugModeBool={this.state.debugMode}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-9'>
                        <br />
                        {/*<div className='card shadow rounded'>*/}
                        {/*    <div className='card-body'>*/}
                        {/*        <h5 className='card-title ml-2 mt-2'>Command Options</h5>*/}
                        {/*        <div className='card-text'>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Copy</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Blank</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Add</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Subtract</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Multiply</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Divide</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Modulus</button>*/}
                        {/*        </div>*/}
                        {/*        <div className='card-text'>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Jump</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>JumpZ</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>JumpNZ</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>DecJumpNZ</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>Split</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipE</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipNE</button>*/}
                        {/*            <button className='btn btn-outline-info ml-2 mb-2 mr-sm-2'>SkipL</button>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }
}
