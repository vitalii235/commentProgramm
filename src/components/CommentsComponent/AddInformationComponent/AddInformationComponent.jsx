import React from 'react'
import ButtonCommentComponent from './ButtonCommentComponent'
import InputCommentComponent from './InputCommentComponent'
import classes from './AddInformationComponent.module.scss'
import AddCompanyComponent from "../../AddCompanyComponent/AddCompanyComponent";


export default function AddInformationComponent(props) {
    return (
        <div className={classes.AddInformationComponent}>
            <InputCommentComponent
                changedName={props.changedName}
                InputValue={props.InputValue}
                HandleChangeInput={props.HandleChangeInput}
                isInputEmpty={props.isInputEmpty}
            />
            <ButtonCommentComponent
                id={props.id}
                InputValue={props.InputValue}
                handleAddComment={props.handleAddComment}
                editedStatus={props.editedStatus}
                addEditedComment={props.addEditedComment}
                dropButtonStatus={props.dropButtonStatus}/>
        </div>
    )
}
