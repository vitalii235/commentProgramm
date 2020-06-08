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


export default function ButtonCommentComponent(props) {
    const {editedStatus} = props
    const cancelButton = <Button
        onClick={props.dropButtonStatus}
        style={{marginTop: '20px'}}
        variant="contained"
        color="secondary">Отменить</Button>
    const classes = useStyles();
    return (
        <div className={classes.root} style={{display: 'inline-block',}}>
            <Button disabled={props.InputValue === '' ? true : false}
                    onClick={editedStatus ? () => props.addEditedComment(props.id) : () => props.handleAddComment(props.id)}
                    variant="contained" color="secondary" style={{marginTop: '20px'}}>
                {editedStatus?'Сохранить':'Добавить'}
            </Button>
            {editedStatus ? cancelButton : null}
        </div>
    )
}
