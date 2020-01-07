import React from "react";
import './modal.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
        marginBottom: 12,
    },
});

export default function Modal({ handleClose, show }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const classes = useStyles();

    return (
        <div className={showHideClassName} >
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        A Mini Instruction Guide
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        ~For Beginners new to the platform~
                    </Typography>
                    <CardActions>
                        <Button size="small" onClick={handleClose}>Close Instructions  📃 </Button>
                    </CardActions>
                    <Typography variant="body2" component="p">
                        Cards are surfaces that display content and actions on a single topic.

                        They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href='http://vyznev.net/corewar/guide.html' rel='noopener noreferrer' target='_blank'><Button size="small">Learn More from the OG Guide </Button> </a>
                </CardActions>
            </Card>
        </div>
    );
};