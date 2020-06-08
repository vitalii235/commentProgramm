import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

export default function InputComponent(props) {
    const classes = useStyles();
    const {InputValue, HandleChangeInput, isInputEmpty} = props
    return (
        <form className={classes.root} noValidate autoComplete="off" style={{display: 'inline-block'}}>
            {InputValue.length > 20
                ? <TextField
                    error
                    id="standard-error-helper-text"
                    label="Error"
                    helperText="Слишком длинное имя."
                    value={InputValue}
                    onChange={HandleChangeInput}
                />
                : props.changedName
                    ? isInputEmpty
                        ? <TextField
                            error
                            id="standard-error-helper-text"
                            label="Error"
                            helperText='Не вводите пустое поле'
                            value={InputValue}
                            onChange={HandleChangeInput}
                        />
                        :<TextField
                        id="standard-textarea"
                        value={InputValue}
                        label="Введите имя"
                        placeholder="Имя компании"
                        multiline
                        onChange={HandleChangeInput}

                    />
                     : <TextField
                        error
                        id="standard-error-helper-text"
                        label="Error"
                        helperText='Вы не ввели никаких данных'
                        value={InputValue}
                        onChange={HandleChangeInput}
                    />
            }


        </form>
    )
}
