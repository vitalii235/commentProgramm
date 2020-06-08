import React from 'react'
import AddToolsComponens from './AddToolsComponens'
import ListOfCompanies from './ListOfCompanies'
import classes from './AddCompanyComponent.module.scss';

export default function AddCompanyComponent(props) {
    return (
        <div className={classes.AddCompanyComponent}>
            <ListOfCompanies
                companies={props.companies}
                deleteCompanies={props.deleteCompanies}
                handleChangeCommentText={props.handleChangeCommentText}
                editCompany={props.editCompany}
                localId={props.localId}
            />
            <AddToolsComponens
                style={{display: 'inline-block'}}
                InputValue={props.InputValue}
                HandleChangeInput={props.HandleChangeInput}
                HandleAddCompanyName={props.HandleAddCompanyName}
                editedStatus={props.editedStatus}
                addEditedCompany={props.addEditedCompany}
                changedName={props.changedName}
                dropButtonStatus={props.dropButtonStatus}
                isInputEmpty={props.isInputEmpty}
            />
        </div>
    )
}
