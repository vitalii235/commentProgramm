import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import classes from './ListOfCompanies.module.scss';

export default function ListOfCompanies(props) {
    const { companies } = props
    return (
        <ul>
            {companies.map((item) => {
                return (
                    <ListItem button key={item.id} className={classes.ListOfCompanies}>
                        <div className={classes.blockFirst}>
                            <DeleteForeverIcon className={classes.deleteButton} onClick={() => props.deleteCompanies(item.id)} />
                            <EditIcon onClick={() => props.editCompany(item.id)} className={classes.editButton} />
                            <Link to={'/user/'+props.localId+'/companiesList/' + item.id} onClick={props.handleChangeCommentText} className={classes.info}>
                                <ListItemText inset primary={item.name} className={classes.name} />
                            </Link>
                        </div>
        
                        <ListItemText inset primary={item.date} className={classes.blockSecond} />
                    </ListItem>
                )
            }).reverse()
            }
        </ul>
    )
}
