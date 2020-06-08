import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

export default function ButtonComponent(props) {
    const {InputValue, editedStatus} = props
    const classes = useStyles();
    const cancelButton = <Button
        onClick={props.dropButtonStatus}
        style={{marginTop: '55px'}}
        variant="contained"
        color="secondary">Отменить</Button>
    return (
        <div className={classes.root} style={{display: 'inline-block', marginLeft: '40px', marginBottom: '40px'}}>
            <Button onClick={editedStatus ? props.addEditedCompany : props.HandleAddCompanyName}
                    disabled={InputValue === '' ? true : InputValue.length > 20 ? true : false} variant="contained"
                    color="secondary" style={{marginTop: '55px'}}>
                {editedStatus ? 'Сохранить' : 'Добавить компанию'}
            </Button>
            {editedStatus ? cancelButton : null}
        </div>
    )
}
// addEditedCompany