import React from 'react'
import InformationComponent from './InformationComponent/InformationComponent'
import AddCompanyComponent from './AddCompanyComponent/AddCompanyComponent'
import {Switch, Route, Link} from 'react-router-dom'
import CommentsComponent from './CommentsComponent/CommentsComponent'
import Loader from "./Loader";
import classes from "./DisplayComponent.module.scss";
import Button from '@material-ui/core/Button';

export default function DisplayComponent(props) {
    const [email, password, token, localId] = props.autentefication
    return (
        <div className={classes.DisplayComponent}>
            {props.loader
                ? <div className={classes.loaderContainer}><Loader className={classes.LoaderImg}/></div>
                : <div>
                    <div className={classes.logoContainer}>
                        <Link to={'/user/' + props.storage}
                              onClick={props.commentStatus ? props.handleChangeCommentText : null}
                              style={{color: '#fff', textDecoration: 'none'}}><h1>USC Trade</h1>
                        </Link>
                        <Link to={'/'} onClick={props.logOut} className={classes.LinkLogOut}>
                            <Button variant="outlined" color="secondary">
                                Выйти
                            </Button>
                        </Link>

                    </div>
                    <InformationComponent
                        commentStatus={props.commentStatus}/>
                    <Switch>
                        <Route path={'/user/' + props.storage} exact render={() =>
                            <AddCompanyComponent
                                changedName={props.changedName}
                                InputValue={props.InputValue}
                                HandleChangeInput={props.HandleChangeInput}
                                HandleAddCompanyName={props.HandleAddCompanyName}
                                companies={props.companies}
                                deleteCompanies={props.deleteCompanies}
                                handleChangeCommentText={props.handleChangeCommentText}
                                editCompany={props.editCompany}
                                editedStatus={props.editedStatus}
                                addEditedCompany={props.addEditedCompany}
                                localId={props.storage}
                                dropButtonStatus={props.dropButtonStatus}
                                isInputEmpty={props.isInputEmpty}
                            />
                        }/>
                        <Route path={'/user/' + props.storage + '/companiesList/:id'} exact render={({match}) => {
                            const {id} = match.params
                            return <CommentsComponent
                                id={id}
                                InputValue={props.InputValue}
                                changedName={props.changedName}
                                HandleChangeInput={props.HandleChangeInput}
                                handleAddComment={props.handleAddComment}
                                deleteComment={props.deleteComment}
                                editComment={props.editComment}
                                comments={props.comments}
                                editedStatus={props.editedStatus}
                                addEditedComment={props.addEditedComment}
                                dropButtonStatus={props.dropButtonStatus}
                                isInputEmpty={props.isInputEmpty}/>
                        }
                        }/>
                    </Switch></div>
            }
        </div>
    )
}
