//React play page

import React, {Component} from "react"
import { Link } from 'react-router-dom'
import { Command, Add, Dat, Div, Djn, Jmn,
    Jmp, Jmz, Mod, Mov, Mul, Seq,
    Slt, Sne, Spl, Sub } from  './instructions'


export default class Canvas extends Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef();
        var d1 = 5
        var d2 = 10
        var w = 1015
        var h = 815
        var wn = 25
        var hn = 25
        var sl = 5
        this.constants = {
            d1: d1,
            d2: d2,
            w: w,
            h: h,
            wn: wn,
            hn: hn,
            sl: sl,
        }
    }

    updateCanvas(c, ctx){
        var count = 0
        let memory = this.props.memory
        let {wn, hn, d1, d2, sl} = this.constants

        ctx.clearRect(0, 0, c.width,c.height);

        for (var w_inc=0; w_inc<wn; w_inc++){
            for (var h_inc=0; h_inc<hn; h_inc++){
                ctx.beginPath();
                ctx.strokeStyle = "gray";
                if(memory[count].player_id == 0)
                    ctx.strokeStyle = "red";
                else if(memory[count].player_id == 1)
                    ctx.strokeStyle = "blue";
                ctx.beginPath();
                ctx.rect(d2+w_inc*(sl+d1), d2+h_inc*(sl+d1), sl, sl);
                ctx.stroke();
                count++
            }
        }
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        this.updateCanvas(canvas, ctx)
    }

    componentDidUpdate() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        this.updateCanvas(canvas, ctx)
    }

    render(){
        return(
            <canvas ref={this.canvasRef} id="myCanvas" width="1015" height="815"></canvas>
        )
    }
}
