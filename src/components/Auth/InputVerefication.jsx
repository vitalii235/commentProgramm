import React from 'react'

import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AlertComponent from "./AlertComponent";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);
export default function InputVerefication(props) {
    const {registrationStatus, isPasswordLength} = props
    const classes = useStyles();
    const {email, password} = props
    const InputStyle = {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}
    return (
        <form className={classes.root} noValidate autoComplete="off" style={InputStyle}>
            {registrationStatus === true ? <AlertComponent
                    handleChangeRegistrationStatus={props.handleChangeRegistrationStatus}/>
                : registrationStatus === null
                    ? <TextField
                        onChange={props.inputEmail}
                        value={email.email}
                        id="standard-search"
                        label="Email"
                        type="search"
                        style={{display: 'block'}}/>
                    : registrationStatus === false
                        ? <TextField
                            error
                            onChange={props.inputEmail}
                            value={email.email}
                            id="standard-error-helper-text"
                            helperText="Вы ввели неверные данные для регистрации"
                            label="Error"
                            style={{display: 'block'}}/>
                        : null}
            {registrationStatus === true
                ? null
                : isPasswordLength
                    ? <TextField
                        value={password.password}
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={props.inputPassword}
                        style={{display: 'block'}}
                    />
                    : <TextField
                        error
                        value={password.password}
                        id="standard-error-helper-text"
                        helperText="Пароль должен содержать больше 6-ти символов"
                        label="Error"
                        autoComplete="current-password"
                        onChange={props.inputPassword}
                        style={{display: 'block'}}
                    />
            }
        </form>
    )
}

