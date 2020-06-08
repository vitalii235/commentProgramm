import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function AlertComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert onClose={props.handleChangeRegistrationStatus}>Вы успешно зарегестрированны</Alert>
        </div>
    );
}