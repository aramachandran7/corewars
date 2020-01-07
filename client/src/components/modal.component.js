import React from "react";
import './modal.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    card: {
        width: '40%',
        height: '40%',
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
    boxClass: {
        maxWidth: '60%',
        wordWrap: 'break-word',
        whiteSpace: 'normal'
    }
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
                        <CardActions>
                            <button type="button" onClick={handleClose} className="btn btn-outline-warning float-right">Close Instructions  📃 </button>
                        </CardActions>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        ~For Beginners new to the platform~
                    </Typography>

                    {/*<ogModalComponent />*/}

                    {/*<Typography paragraph>*/}
                    {/*    Here’s some background information on the game, how to play, and how to ‘win’: The tutorial can always be opened up again with the yellow ‘Show Instructions’ button.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    Corewars at first will be challenging. The game is most fun once one understands the fundamental concepts and begins applying them.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    We believe that learning this game should be a group struggle; i.e. pair programming is recommended.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    Once you close out of these instructions, you’ll be greeted by, on the right a 2 dimensional matrix of grey squares, and on the left an input section.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    This matrix is the home of all your code - your custom warrior, represented by the blue blocks, will face off against the enemy warrior, represented by the red block.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    Your warrior is made up of commands. If your warrior were 5 commands long, you would start the game being able to see 5 blue blocks representing your warrior.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    Your entire warrior is spawned in at a random position on the board at the start of the game.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    The game is automatic & turn-based - once you hit the green run button, you can lean back and watch your warrior and the other battle it out.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    The entire matrix can be thought of as an infinite loop, with the square after the final square being the initial square.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    There are two modes for gameplay - if you are just starting off, keep both beginner mode and debug mode enabled.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    Your entire warrior is spawned in at a random position on the board at the start of the game.*/}
                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    Your entire warrior is spawned in at a random position on the board at the start of the game. Your entire warrior is spawned in at a random position on the board at the start of the game. Guess what hi hi hi hih ih ihi*/}


                    {/*</Typography>*/}
                    {/*<Typography paragraph>*/}
                    {/*    Each player starts with a single process, and the process starts at the first command of your warrior, and moves in a downwards fashion, executing each command in its path (at the end of a column, it will hop to the column on its right). The game will jump between executing a command in your process, and executing a command in the opponent’s process. A process is ended when your process executes on one of the grey blocks in the matrix that were there all along. In fact, those grey blocks are commands too, whose main purpose is to end processes. If your process runs on a grey block, it ends.*/}
                    {/*</Typography>*/}
                    {/*<p>*/}
                    {/*    Each player starts with a single process, and the process starts at the first command of your warrior, and moves in a downwards fashion, executing each command in its path (at the end of a column, it will hop to the column on its right). The game will jump between executing a command in your process, and executing a command in the opponent’s process. A process is ended when your process executes on one of the grey blocks in the matrix that were there all along. In fact, those grey blocks are commands too, whose main purpose is to end processes. If your process runs on a grey block, it ends.*/}

                    {/*</p>*/}

                </CardContent>

                <CardActions>
                    <a href='https://docs.google.com/document/d/1yzjQt1JK4jxCi0L0___yNli0lk3kd6USKuilNhceUYM/edit?usp=sharing' rel='noopener noreferrer' target='_blank'><Button size="small">Check out the guide here!</Button> </a>
                </CardActions>
                <CardActions>
                    <a href='http://vyznev.net/corewar/guide.html' rel='noopener noreferrer' target='_blank'><Button size="small">Learn More from the OG Guide </Button> </a>
                </CardActions>
            </Card>
        </div>
    );
};