import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

// Header -- a function React component to define the header of the web page -- this is
// primarily navigation tool bar (appbar) based on Material-UI. The navigation links change
// the browser path so that different pages get displayed in this SPA.
export default function Header() {
    const classes = useStyles();

    return (
         <header className="App-header">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={RouterLink} to={"/"}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        UW Explorer
                    </Typography>
                    <Button color="inherit" component={RouterLink} to={"/campuses"}>Campuses</Button>
                    <Button color="inherit" component={RouterLink} to={"/colleges"}>Colleges</Button>
                    <Button color="inherit" component={RouterLink} to={"/courses"}>CourseSearch</Button>
                </Toolbar>
            </AppBar>
        </header>
    );
}

