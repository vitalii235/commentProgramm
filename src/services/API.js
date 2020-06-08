import axios from 'axios'

const BASE_URL = 'https://myfirstproject-bf2e8.firebaseio.com/'
const COMPANIES = '/companiesList'
const COMMENTS = '/comments'

const REGISTRATION_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
const LOGIN_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
const OUR_PROJECT_KEY = 'AIzaSyCdWg8qeGZ7SuEFOsE_aXTO4SJ8_lFIJ1Y'
const USERS = '/users'


const companies = {
    userPost:(params) => axios.post(`${BASE_URL}${USERS}.json`, params),

    list: (params = null) => axios(`${BASE_URL}${COMPANIES}.json`, params),
    get: (id, params = null) => axios.get(`${BASE_URL}${COMPANIES}/${id}.json`, params),
    post: (params) => axios.post(`${BASE_URL}${COMPANIES}.json`, params),
    put: (id, params = null) => axios.put(`${BASE_URL}${COMPANIES}/${id}.json`, params),
    delete: (id) => axios.delete(`${BASE_URL}${COMPANIES}/${id}.json`),

    postComment: (params) => axios.post(`${BASE_URL}${COMMENTS}.json`, params),
    listComments: (params = null) => axios(`${BASE_URL}${COMMENTS}.json`, params),
    deleteComment: (id) => axios.delete(`${BASE_URL}${COMMENTS}/${id}.json`),
    getComment: (id) => axios.get(`${BASE_URL}${COMMENTS}/${id}.json`),
    putComment: (id, params = null) => axios.put(`${BASE_URL}${COMMENTS}/${id}.json`, params),

    registration: (params) => axios.post(`${REGISTRATION_BASE_URL}${OUR_PROJECT_KEY}`, params),
    logIn: (params) => axios.post(`${LOGIN_BASE_URL}${OUR_PROJECT_KEY}`, params)
}


export default companies