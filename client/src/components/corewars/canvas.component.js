import React, {PureComponent} from "react"
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
        }
        const onMouseHover = ()=>{
            this.props.onHover(index)
            console.log('indexA: ' + this.props.indexA)
            console.log('indexB: ' + this.props.indexB)
            console.log('index: ' + index)
        }

        // const onMouseUnHover = () => {
        //     hovered=false
        // }


        let c
        if (this.props.indexA === 1)
            c = "CellA padding-0"
        else if (this.props.indexB === 1)
            c = "CellB padding-0"
        else if (this.props.current === 1)
            c = "CellC padding-0"
        else
            c = "Cell padding-0"

        return (
            <div className = {c}
                onMouseEnter = {() => onMouseHover()}
                // onMouseLeave={() => onMouseUnHover()}
                style={{
                    left: `${CELL_SIZE * x + X_OFFSET}px`,
                    top: `${CELL_SIZE * y + Y_OFFSET}px`,
                    width: `${CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                    backgroundColor: `${bg_color}`,
                }}
            />
        )

    }
}
