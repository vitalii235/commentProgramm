import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import classes from './ListOfComments.module.scss';

export default function ListOfComments(props) {
    const { comments, id } = props
    let commentsList = comments.filter((item) => item.idx === id).map((item) =>
        <ListItem button key={item.id} className ={classes.ContainerOfComment}>
            <div className ={classes.Functions}>
                <div className ={classes.Buttons}>
                    <DeleteForeverIcon className={classes.deleteButton} onClick={()=>props.deleteComment(item.id)}/>
                    <EditIcon className={classes.editIcon} onClick={()=>props.editComment(item.id, item.idx)}/>
                </div>
                <ListItemText inset primary={item.name} className={classes.Name}/>
            </div>
            <ListItemText inset primary={item.date} className ={classes.Date}/>
        </ListItem>)
    return (
        <ol className ={classes.ListOfComments}>
            {commentsList.reverse()}
        </ol>
    )
}
