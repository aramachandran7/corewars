import React from "react";
import './modal.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        width: '80%',
        height: '80%',
        top:'50%',
        left:'50%',
        // transform: 'translate('-50%','-50%'),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 6,
        marginTop: 6,
        marginLeft: 6,
        marginRight: 6,
    },
});

export default function Modal({ handleClose, show }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const classes = useStyles();

    return (
        <div className={showHideClassName} >
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h3" component="h2">
                        A Mini Instruction Guide
                        <Typography className={classes.pos} color="textSecondary">
                            ~For Beginners new to the platform~
                        </Typography>
                        <CardActions>
                            <button type="button" onClick={handleClose} className="btn btn-outline-warning float-right">Close Instructions  📃 </button>
                            <a href='https://docs.google.com/document/d/1yzjQt1JK4jxCi0L0___yNli0lk3kd6USKuilNhceUYM/edit?usp=sharing' rel='noopener noreferrer' target='_blank'><button type="button" className="btn btn-outline-warning float-right">View Full Guide  📃 </button></a>
                            <a href='http://vyznev.net/corewar/guide.html' rel='noopener noreferrer' target='_blank'><button type="button" className="btn btn-outline-warning float-right">View Original Guide  📃 </button></a>

                        </CardActions>
                    </Typography>

                    <iframe width='100%' height='400px' src="https://docs.google.com/document/d/e/2PACX-1vTUl70SejBmm5m-l6YzosAARYR5UByuzjFQViHKamqLOX9KCK-aqBYnQe-bcqhVJuBICWaYce1YbNcB/pub?embedded=true"></iframe>
                </CardContent>


            </Card>
        </div>
    );
};

