import React from 'react'
import InputVerefication from './InputVerefication'
import AuthButtons from './AuthButtons'
import classes from './Auth.module.scss'

export default function Auth(props) {
    const [email, password, token] = props.authStatus
    return (
        <div>
            <h1>USC Trade</h1>
            <div>
                <h2 style={{textAlign:'center'}}>Войдите или зарегистрируйтесь </h2>
                <div className={classes.Autorization}>
                    <InputVerefication
                        handleChangeRegistrationStatus={props.handleChangeRegistrationStatus}
                        registrationStatus={props.registrationStatus}
                        inputEmail={props.inputEmail}
                        inputPassword={props.inputPassword}
                        email={email}
                        password={password}
                        isPasswordLength={props.isPasswordLength}/>
                    <AuthButtons
                        registration={props.registration}
                        logIn={props.logIn}
                        localId={props.localId}
                    />
                </div>
            </div>


        </div>
    )
}
