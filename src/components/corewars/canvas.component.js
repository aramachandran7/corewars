import React, {PureComponent} from "react"
// import { Link } from 'react-router-dom'
// import { Command, Add, Dat, Div, Djn, Jmn,
//     Jmp, Jmz, Mod, Mov, Mul, Seq,
//     Slt, Sne, Spl, Sub } from  './instructions'
import "./canvas.component.css"


const WIDTH = 800
const HEIGHT = 600
const ROWS = 25
const COLUMNS = 25
const CELL_SIZE = (WIDTH / COLUMNS > HEIGHT / ROWS ?
    Math.floor(HEIGHT / ROWS) : Math.floor(WIDTH / COLUMNS))
const X_OFFSET = Math.floor((WIDTH - CELL_SIZE * COLUMNS) / 2)
const Y_OFFSET = Math.floor((HEIGHT - CELL_SIZE * ROWS) / 2)



export default class Cell extends PureComponent {
    render() {
        console.log("Rendered")
        const { index, player_id, } = this.props
        const x = Math.floor(index / ROWS)
        const y = index % ROWS
        let bg_color
        // var hovered = false;

        // if (hovered){
        //     bg_color="#3C393F"
        // }
        // else {
        switch (player_id) {
            case 0:
                bg_color = "red"
                break
            case 1:
                bg_color = "blue"
                break
            default:
                bg_color = "#eeeeee"
                break
            // }
        }
        const onMouseHover = ()=>{
            this.props.onHover(index)
        }
        //
        // const onMouseUnHover = () => {
        //     this.props.onUnHover()
        // }

        // const onMouseToggle = () => {
        //     console.log('mousetoggled')
        //     hovered = !hovered;
        // }

        return (
            <div className="Cell padding-0" style={{
                left: `${CELL_SIZE * x + X_OFFSET}px`,
                top: `${CELL_SIZE * y + Y_OFFSET}px`,
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: `${bg_color}`,
                // onMouseLeave: {onMouseToggle},
            }}
            onMouseEnter = {() => onMouseHover()}
            />
        )
    }
}
