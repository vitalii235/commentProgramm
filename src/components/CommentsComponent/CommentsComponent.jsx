import React from 'react'
import AddInformationComponent from './AddInformationComponent/AddInformationComponent'
import ListOfComments from './ListOfComments/ListOfComments'
import AddCompanyComponent from "../AddCompanyComponent/AddCompanyComponent";

export default function CommentsComponent(props) {
    return (
        <div>
            <ListOfComments
                comments={props.comments}
                deleteComment={props.deleteComment}
                editComment={props.editComment}
                id={props.id}/>
            <AddInformationComponent
                id={props.id}
                changedName={props.changedName}
                InputValue={props.InputValue}
                HandleChangeInput={props.HandleChangeInput}
                handleAddComment={props.handleAddComment}
                editedStatus={props.editedStatus}
                addEditedComment={props.addEditedComment}
                dropButtonStatus={props.dropButtonStatus}
                isInputEmpty={props.isInputEmpty}/>
        </div>
    )
}
