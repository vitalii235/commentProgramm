import React from 'react'
import InputComponent from './InputComponent'
import ButtonComponent from './ButtonComponent'
import classes from './AddToolsComponens.module.scss';

export default function AddToolsComponens(props) {
    return (
        <div className={classes.AddToolsComponens}>
            <InputComponent
                changedName={props.changedName}
                InputValue={props.InputValue}
                HandleChangeInput={props.HandleChangeInput}
                isInputEmpty={props.isInputEmpty}
            />
            <ButtonComponent
                HandleAddCompanyName={props.HandleAddCompanyName}
                InputValue={props.InputValue}
                editedStatus={props.editedStatus}
                addEditedCompany={props.addEditedCompany}
                dropButtonStatus={props.dropButtonStatus}

            />
        </div>
    )
}
