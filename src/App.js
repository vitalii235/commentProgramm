import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import classes from './App.module.scss';
import DisplayComponent from './components/DisplayComponent';
import companies from './services/API';
import Auth from './components/Auth/Auth';
import {Switch, Route, withRouter} from 'react-router-dom'


class App extends Component {
    state = {
        autentefication: [
            {email: ''},
            {password: ''},
            {token: ''},
            {localId: ''}
        ],
        editedStatus: false,
        editedIndex: '',
        indexForComment: '',
        commentStatus: false,
        InputValid: true,
        InputValue: '',
        loader: true,
        companies: [],
        comments: [],
        checkedInputValue: '',
        changedName: true,
        isInputEmpty: false,
        storage: '',
        registrationStatus: null,
        isPasswordLength: true,
    }
    // //////AUTH///////////////
    logOut = () => {
        localStorage.removeItem('id')
        const storage = ''
        this.setState({
            storage
        })
    }

    inputEmail = (event) => {
        const email = {email: event.target.value}
        const autentefication = this.state.autentefication
        autentefication[0] = email
        this.setState({
            autentefication
        })
    }
    inputPassword = (event) => {
        const password = {password: event.target.value}
        const autentefication = this.state.autentefication
        autentefication[1] = password
        this.setState({
            autentefication
        })
    }
    registration = async () => {
        const authData = {
            email: this.state.autentefication[0].email,
            password: this.state.autentefication[1].password,
            returnSecureToken: true,
        }
        let isLength = this.state.autentefication[1].password
        if (isLength.length < 6) {
            this.setState({
                isPasswordLength: false
            })
        } else {
            try {
                const res = await companies.registration(authData)
                if (res) {
                    const name = {name: res.data.localId}
                    await companies.userPost(name)
                    this.setState({
                        registrationStatus: true,
                        isPasswordLength: true
                    })
                }
            } catch (e) {
                console.log(e)
                this.setState({
                    registrationStatus: false
                })
            }
        }

    }
    logIn = async () => {
        const authData = {
            email: this.state.autentefication[0].email,
            password: this.state.autentefication[1].password,
            returnSecureToken: true,
        }
        const autentefication = this.state.autentefication
        autentefication[3].localId = ''
        try {
            const res = await companies.logIn(authData)
            const localId = res.data.localId
            if (localId) {
                autentefication[3].localId = localId
                localStorage.setItem('id', localId)
                this.setState({
                    autentefication
                })
                this.updateCompanies()
                this.props.history.push(`/user/${localId}`)
                            }
        } catch (e) {
            console.log(e)
        }
    }


    // //////////////////////////
    componentDidMount() {
        this.updateCompanies()
    }

    // Метод гет и вывод на страничку
    updateCompanies = async () => {
        try {
            const storage = localStorage.getItem('id')
            const r = await companies.list()
            let entries = []
            r.data && (entries = Object.entries(r.data))
            let comp = []
            for (let [id, data] of entries) {
                comp.push({
                    id: id,
                    idOfUser: data.id,
                    name: data.name,
                    date: data.date,
                    lastComment: data.lastComment
                })
            }
            let newList = comp.filter(item => item.idOfUser === storage)
            newList.sort((a, b) => a.lastComment - b.lastComment)
            // Коментарии
            const res = await companies.listComments()
            let entriesCommetns = []
            if (res.data) {
                entriesCommetns = Object.entries(res.data)
            }
            let comments = []
            for (let [id, data] of entriesCommetns) {
                comments.push({
                    id: id,
                    name: data.name,
                    idx: data.id,
                    date: data.date,
                    lastComment: data.lastComment
                })
            }
            comments.sort((a, b) => a.lastComment - b.lastComment)
            this.setState({companies: newList, comments, storage})
            if(this.state.storage){this.stopLoading()}
        } catch (e) {
            console.error(e)
        }
    }
    // Кнопка добавить компанию
    HandleAddCompanyName = async () => {
        this.dropErrorName()
        const user = this.state.autentefication[3].localId
        let time = new Date()
        let lastComment = time.getTime()
        const company = {
            name: this.state.InputValue.trim(),
            id: user,
            date: `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`,
            lastComment: lastComment
        }
        if (company.name !== '') {
            try {
                let res = await companies.post(company)
                let idx = res.data.name
                if (idx !== undefined) {
                    this.updateCompanies();
                }
            } catch (e) {
                console.log(e)
            }
            this.setState({
                InputValid: true,
                InputValue: ''
            })
        } else {
            this.isInputEmpty()
        }
    }
    // Редактирование компании
    editCompany = async id => {
        this.dropButtonStatus()
        this.dropErrorName()
        try {
            const res = await companies.get(id)
            this.setState({
                InputValue: res.data.name,
                editedStatus: true,
                editedIndex: id,
                checkedInputValue: res.data.name
            })
        } catch (e) {
            console.error(e)
        }
    }

    // Добавление редактированой компании
    addEditedCompany = async () => {
        this.dropErrorName()
        const user = this.state.autentefication[3].localId
        const idx = this.state.editedIndex
        let time = new Date()
        let lastComment = time.getTime()
        const text = this.state.InputValue.trim()
        if (text !== '') {
            if (text !== this.state.checkedInputValue) {
                const name = {
                    name: text,
                    id: user,
                    date: `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`,
                    lastComment: lastComment
                }
                try {
                    await companies.put(idx, name)
                    this.updateCompanies()
                    this.handleCleanInput()
                    this.setState({
                        editedStatus: false
                    })
                } catch (e) {
                    console.error(e)
                }
            } else {
                this.setState({
                    changedName: false
                })
            }
        } else {
            this.isInputEmpty()
        }

    }
    // Удаление компании
    deleteCompanies = async id => {
        this.handleCleanInput()
        this.dropErrorName()
        try {
            await companies.delete(id)
            this.updateCompanies()
        } catch (e) {
            console.error(e)
        }
    }
    // ////////КОМЕНТАРИИ////////////////////
    // Добавление коммента
    handleAddComment = async id => {
        this.dropErrorName()
        let time = new Date()
        let lastComment = time.getTime()
        const commetn = {
            name: this.state.InputValue.trim(),
            id: id,
            date: `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`,
            lastComment: lastComment
        }
        if (commetn.name !== '') {
            try {
                await companies.postComment(commetn)
                this.updateCompanies();
                this.handleCleanInput()
            } catch (e) {
                console.error(e)
            }
        } else {
            this.isInputEmpty()
        }

    }
    // Удаление коментария
    deleteComment = async id => {
        this.dropErrorName()
        this.handleCleanInput()
        try {
            await companies.deleteComment(id)
            this.updateCompanies()
        } catch (e) {
            console.error(e)
        }
    }
    // Редактирование коментария
    editComment = async (id, idx) => {
        this.dropErrorName()
        this.dropButtonStatus()
        try {
            const res = await companies.getComment(id)
            const InputValue = res.data.name
            this.setState({
                InputValue,
                editedIndex: id,
                indexForComment: idx,
                checkedInputValue: res.data.name,
                editedStatus: true
            })
        } catch (e) {
            console.error(e)
        }
    }
    // Добавление редактированного комента////////////////////
    addEditedComment = async () => {
        this.dropErrorName()
        const text = this.state.InputValue.trim()
        const indexForComment = this.state.indexForComment
        const id = this.state.editedIndex
        let time = new Date()
        let lastComment = time.getTime()
        if (text !== '') {
            if (text !== this.state.checkedInputValue) {
                const commetn = {
                    name: text,
                    id: indexForComment,
                    date: `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`,
                    lastComment: lastComment
                }
                try {
                    await companies.putComment(id, commetn)
                    this.updateCompanies()
                    this.handleCleanInput()
                    this.setState({
                        editedStatus: false
                    })
                } catch (e) {
                    console.error(e)
                }
            } else {
                this.setState({
                    changedName: false
                })
            }
        } else {
            this.isInputEmpty()
        }

    }

    // Получение значения инпут
    HandleChangeInput = (event) => {
        const InputValue = event.target.value
        this.isInputNotEmpty()
        this.dropErrorName()
        this.setState({
            InputValue,
            InputValid: false,

        })
    }
    // Очистка инпута
    handleCleanInput = () => {
        this.isInputNotEmpty()
        const InputValue = ''
        this.setState({
            InputValue
        })
    }
    // Сброс ошибки инпут
    dropErrorName = () => {
        this.isInputNotEmpty()
        this.setState({
            changedName: true
        })
    }
    // Переключение между названиями окон
    handleChangeCommentText = () => {
        this.isInputNotEmpty()
        this.dropErrorName()
        this.setState({
            commentStatus: !this.state.commentStatus,
            editedStatus: false
        })
        this.handleCleanInput()
    }
    // Кнопка отмены
    dropButtonStatus = () => {
        this.isInputNotEmpty()
        this.setState({
            editedStatus: false,
        })
        this.dropErrorName()
        this.handleCleanInput()
    }
    // Отмена загрузки
    stopLoading = () => {
        this.setState({
            loader: false
        })
    }

    isInputEmpty = () => {
        this.setState({
            isInputEmpty: true
        })
    }
    isInputNotEmpty = () => {
        this.setState({
            isInputEmpty: false
        })
    }
    handleChangeRegistrationStatus = () => {

        this.setState({
            registrationStatus: null
        })
    }

    render() {
        const primary = blue[300];
        const {InputValue, isInputEmpty, InputValid, companies, comments, editedStatus, autentefication, commentStatus, changedName, loader, storage} = this.state
        let info = storage
        console.log(this.state.loader)
        return (
            <div className={classes.App}>
                <Grid container>
                    <Box
                        boxShadow={3}
                        bgcolor="background.paper"
                        m={1}
                        p={1}

                        style={{width: '630px', minHeight: '300px', backgroundColor: primary}}
                    >
                        <Switch className={classes.BoxComponent}>
                            {
                                info
                                    ? <Route path={'/user/' + storage}
                                             render={() => <DisplayComponent
                                                 // Данные
                                                 changedName={changedName}
                                                 InputValue={InputValue}
                                                 InputValid={InputValid}
                                                 companies={companies}
                                                 comments={comments}
                                                 editedStatus={editedStatus}
                                                 autentefication={autentefication}
                                                 commentStatus={commentStatus}
                                                 storage={storage}
                                                 loader={loader}
                                                 isInputEmpty={isInputEmpty}
                                                 // Функции
                                                 deleteCompanies={this.deleteCompanies}
                                                 HandleChangeInput={this.HandleChangeInput}
                                                 HandleAddCompanyName={this.HandleAddCompanyName}
                                                 handleChangeCommentText={this.handleChangeCommentText}
                                                 handleAddComment={this.handleAddComment}
                                                 deleteComment={this.deleteComment}
                                                 editComment={this.editComment}
                                                 addEditedComment={this.addEditedComment}
                                                 editCompany={this.editCompany}
                                                 addEditedCompany={this.addEditedCompany}
                                                 dropButtonStatus={this.dropButtonStatus}
                                                 logOut={this.logOut}
                                             />}
                                    />
                                    : null
                            }
                            {this.props.history.location.pathname === '/'
                                ? <Route path={'/'} render={({match}) => <Auth
                                    handleChangeRegistrationStatus={this.handleChangeRegistrationStatus}
                                    registration={this.registration}
                                    inputEmail={this.inputEmail}
                                    inputPassword={this.inputPassword}
                                    authStatus={this.state.autentefication}
                                    logIn={this.logIn}
                                    localId={this.state.autentefication[3].localId}
                                    registrationStatus={this.state.registrationStatus}
                                    isPasswordLength={this.state.isPasswordLength}
                                />}/>
                                : null}
                        </Switch>
                    </Box>
                </Grid>
            </div>
        )
    }
}

export default withRouter(App)

