import React from 'react';
import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    footer: {
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#3F51B5',
        color: 'white',
    },
    title: {
        flexGrow: 1,
    },
}));

// Footer - a function React component to display a common footer at the bottom of the web page.
export default function Footer() {
    let classes = useStyles();
    return (
        <footer>
            <Box className={classes.footer}>
                Prototype developed by University of Washington Bothell faculty and students.
            </Box>
        </footer>
    );
}
