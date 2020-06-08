import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCompanyComponent from "../../AddCompanyComponent/AddCompanyComponent";

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

export default function InputCommentComponent(props) {
    const {InputValue, HandleChangeInput, isInputEmpty} = props
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off" style={{display: 'inline-block'}}>
            {InputValue.length > 20 && InputValue.indexOf(' ') == -1
                ? <TextField
                    error
                    id="standard-error-helper-text"
                    label="Error"
                    helperText="Вводите предложение с пробелами)))"
                    value={InputValue}
                    onChange={HandleChangeInput}
                />
                : props.changedName
                    ? isInputEmpty
                        ? <TextField
                            error
                            id="standard-error-helper-text"
                            label="Error"
                            helperText="Нельзя вводить пустую строку"
                            value={InputValue}
                            onChange={HandleChangeInput}
                        />
                        : <TextField
                            id="standard-textarea"
                            label="Введите комментарий"
                            placeholder="Комментарий"
                            multiline
                            value={InputValue}
                            onChange={HandleChangeInput}
                        />
                    : <TextField
                        error
                        id="standard-error-helper-text"
                        label="Error"
                        helperText="Вы не внесли никаких изменений."
                        value={InputValue}
                        onChange={HandleChangeInput}
                    />

            }

        </form>
    )
}
