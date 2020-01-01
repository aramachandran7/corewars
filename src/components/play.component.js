//React play page

import React, {Component} from "react"
// import { Link } from 'react-router-dom'
import Cell from  './corewars/canvas.component'
import { Command, Add, Dat, Div, Djn, Jmn,
    Jmp, Jmz, Mod, Mov, Mul, Seq,
    Slt, Sne, Spl, Sub } from  './corewars/instructions'
import 'bootstrap/dist/js/bootstrap.bundle';




const HEIGHT = 600
const WIDTH = 800
const INTERVAL = 0

const Warrior = (props) => {
    return(
        <div>
            {/*<a className="dropdown-item" href="#" value={props.warrior} >{props.warrior.name} | {props.warrior.commandList.length}</a>*/}
            <button className="dropdown-item" type="button" value={props.warrior}> name: {props.warrior.name} | length: {props.warrior.commandList.length}</button>
        </div>
    )
}

const RenderHoverInfo = (props) => {
    return(
        <div>
            <p className="card-text"> <b>Command: {props.hoverProp.name}</b> a_am: <b>{props.hoverProp.a_am}</b> |
            a: <b>{props.hoverProp.a}</b> | b_am: <b>{props.hoverProp.b_am}</b> |
            b: <b>{props.hoverProp.b}</b> | mod: <b>{props.hoverProp.mod}</b></p>
            {/*<p>index: {props.hoverProp}</p>*/}
        </div>

    )
}
export default class Play extends Component {
    constructor(props) {
        super(props);
        const memory_size = 625
        var memory = this.init(memory_size)


        this.onChangePlayer1Code = this.onChangePlayer1Code.bind(this)
        this.onChangeHover = this.onChangeHover.bind(this)
        this.onResetHover = this.onResetHover.bind(this)
        this.onMouseToggle = this.onMouseToggle.bind(this)

        var player1_code = [new Mov(0, 1, "$", "$", "I", memory_size)] // array of commands
        // var player1_code = props.p1code;

        // const player2_code = [new Add(4, 3, '#','$', 'AB', memory_size),
        //     new Mov(2, 2, "$", "@", "I", memory_size),
        //     new Jmp(-2, 0,'$', '$', '', memory_size),
        //     new Dat(0, 0, '$', '$', '', memory_size)]
        var player2_code = props.p2code

        var players = this.make_players(memory, [player1_code, player2_code])

        this.state = {
            raw_code: [player1_code, player2_code],
            player1Code: player1_code,
            memory_size: memory_size,
            memory: memory,
            players: players,
            game_length: 2000,
            final_length: 0,
            done: null,
            current_step: 1,
            current_player: 0,
            in_game: false,
            warriors: props.warriorList,
            hoverInfo: {},
        }
    }

    onChangeHover(memIndex){
        const instructionValues = this.state.memory[memIndex].values()

        this.setState({
            hoverInfo: instructionValues
            // hoverInfo: memIndex
        })
    }

    onResetHover(){
        this.setState({
            hoverInfo: null,
        })
    }

    onMouseToggle(){
        console.log('Mouse Toggled')
    }

    onChangePlayer1Code(e){
        let newPlayers = this.state.raw_code.map(x => (Object.assign(Object.create( Object.getPrototypeOf(x)), x)));
        newPlayers[0] = e.target.value;

        this.setState({
            raw_code:newPlayers,
            players: this.make_players(this.state.memory, newPlayers)
        })
    }

    init(memory_size) {
        var memory = []
        for (let i = 0; i < memory_size; i++) {
            memory.push(new Dat(0, 0, "$", "$", "", memory_size))
            memory[memory.length - 1].init(i, -1)
        }
        return memory
    }

    check_memory(memory, start, code_len) {
        for (var i = 0; i < code_len; i++) {
            if (memory[(start + i) % memory.length].player_id !== -1)
                return false
        }
        return true
    }

    set_code(memory, code, player_id) {
        // Find a starting location that doesn't overlap with player code
        var start = Math.floor(Math.random() * (memory.length - 1))
        while (!this.check_memory(memory, start, code.length)) {
            start = Math.floor(Math.random() * (memory.length - 1))
        }

        for (var i = 0; i < code.length; i++) {
            var address = (start + i) % memory.length
            memory[address] = code[i]
            memory[address].init(address, player_id)
        }
        return start
    }

    make_players(memory, code) {
        let players = []
        for (var i = 0; i < code.length; i++) {
            let start = this.set_code(memory, code[i], i)
            // Start new process where code was written
            let player = {
                "processes": [start],
                "current": 0
            }
            players.push(player)
        }
        return players
    }

    step(current_player, players) {
        const {memory} = this.state
        const {processes, current} = players[current_player]
        const address = processes[current]

        // let copy_memory = memory.map(x =>
        //     (Object.assign( Object.create( Object.getPrototypeOf(x)), x)))


        let copy_processes = [...processes]
        var copy_current = current
        let [new_memory, new_processes, new_current] = memory[address].call(memory,
            copy_processes, copy_current, current_player)
        new_current = new_current % new_processes.length

        const new_player = {
            "processes": new_processes,
            "current": new_current
        }
        let new_players = players.map(x => ({...x}))
        new_players[current_player] = new_player

        return [new_memory, new_players]
    }

    forward(recur=true) {
        const {current_step, current_player, players, game_length, in_game} = this.state
        const next_player = (current_player === 0 ? 1 : 0)
        console.log(players)

        if (current_step === game_length)
            this.end(-1, game_length)
        else if (players[current_player]["processes"].length === 0)
            this.end(next_player, current_step)
        else if (in_game) {
            const [new_memory, new_players] = this.step(current_player, players)
            this.setState({
                current_step: current_step + 1,
                current_player: next_player,
                players: new_players,
                memory: new_memory,
            })
            if (recur)
                setTimeout(() => {this.forward()}, INTERVAL)
        }
    }

    start() {
        var players = this.make_players(this.state.memory, this.state.raw_code)
        this.setState({
            players:players,
        })
        if (!this.state.in_game) {
            this.setState({in_game: true}, () => {this.forward()})}
    }

    end(winner, final_length) {
        this.setState({done: winner, final_length: final_length, in_game: false})
    }

    quickEnd(){
        this.setState({
            done: null,
            final_length: 0,
            in_game: false,
            memory: this.init(this.state.memory_size)

        })
    }

    quickEndThink(){
        this.setState({
            done: null,
            final_length:0,
            in_game:false,
        })
    }

    warriorListFunc(){
        this.state.warriors.map(currentWarrior => {
            return(<Warrior warrior={currentWarrior}/>)
        })
    }

    componentWillReceiveProps(nextProps) {
        const memory_size = 625
        var memory = this.init(memory_size)
        this.onChangePlayer1Code = this.onChangePlayer1Code.bind(this)
        this.onChangeHover = this.onChangeHover.bind(this)
        this.onResetHover = this.onResetHover.bind(this)
        this.onMouseToggle = this.onMouseToggle.bind(this)


        var player1_code = [new Mov(0, 1, "$", "$", "I", memory_size)] // array of commands
        var player2_code = nextProps.p2code
        console.log(player1_code)
        console.log(player2_code)

        var players = this.make_players(memory, [player1_code, player2_code])
        this.setState({
            raw_code: [player1_code, player2_code],
            player1Code: player1_code,
            memory_size: memory_size,
            memory: memory,
            players: players,
            game_length: 2000,
            final_length: 0,
            done: null,
            current_step: 1,
            current_player: 0,
            in_game: false,
            warrior: nextProps.warriors,
            hoverInfo: ''
        })
    }

    render(){
        return(
            <div className="container">
                <div className='row'>
                    <button className="btn btn-outline-success mb-2 mr-sm-2" onClick={this.start.bind(this)}>🏃‍</button>
                    <button className="btn btn-outline-danger ml-2 mb-2 mr-sm-2" onClick={this.quickEndThink.bind(this)}>🤔 ❌</button>
                    <button className="btn btn-outline-danger ml-2 mb-2 mr-sm-2" onClick={this.quickEnd.bind(this)}>❌</button>
                    {/*test dropdown*/}
                    <div className="btn-group dropright">
                        <button className="btn btn-secondary dropdown-toggle ml-2 mb-2 mr-sm-2" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onChange={this.onChangePlayer1Code}>
                            Select Opponent ⚔️
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {this.warriorListFunc()}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="card shadow rounded">
                        <div className="card-body">
                            <h4 className='card-title'>Hover'd Info</h4>
                            <RenderHoverInfo hoverProp={this.state.hoverInfo}/>
                        </div>
                    </div>
                </div>
                <br />
                <div className='row float-left' >
                    <div className="Board" style={{height: HEIGHT, width: WIDTH}}>
                        {this.state.memory.map(cell => (
                            <Cell
                                height = {HEIGHT}
                                width = {WIDTH}
                                player_id = {cell.player_id}
                                index = {cell.index}
                                key = {cell.index}
                                style={{onMouseEnter:this.onMouseToggle,
                                        onMouseLeave:this.onMouseToggle,
                                    }}

                                // onHover = {this.onChangeHover}
                                // onUnHover = {this.onResetHover}
                            />
                        ))}
                    </div>
                </div>

            </div>
        )
    }
}
