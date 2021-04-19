import axios from 'axios';
import {getUser, getToken, setUserStorage, removeUserStorage} from '../../helpers/StorageFunctions';

const init = {
    token: getToken(),
    isAuthenticated:null,
    user:getUser()
};

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILED = 'REGISTER_FAILED';
const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
const LOGOUT_USER = 'LOGOUT_USER';

export const register = (first_name,last_name,email,birthday,password,password2) => async(dispatch) => {
    const config = {
        header:{
            'Content-Type':'application/json'
        }
    }
    const body = {first_name,last_name,email,birthday,password,password2}
    try {
        const res = await axios.post('http://localhost:10001/api/v1/auth/create-account', body, config)

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res
        })
    } catch (err) {
        dispatch({
            type:REGISTER_FAILED
        })
    }
}

export const logIn =(email,password) => async (dispatch)=>{
    const config = {
        header:{
            'Content-Type':'application/json'
        }
    };
    const body = {email,password}
    try{
        
        const res = await axios.post('http://localhost:10001/api/v1/auth/login', body, config)
        
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        console.log('user logged in')
    }catch(err){
        dispatch({
            type:LOGIN_FAILED
        });
    }
};


export const authentication = () => async(dispatch) => {
    if(getToken){
        const tokenCheck = {jwt: getToken()};

        try {
            if(tokenCheck.token !== null){
                dispatch({
                    type:AUTHENTICATION_SUCCESS,
                    payload:tokenCheck
                })
            }
        } catch (err) {
            dispatch({
                type:AUTHENTICATION_FAILED
            })
        }
    }else{
        dispatch({
            type:AUTHENTICATION_FAILED
        })
    }
}

export const logOut = ()=> (dispatch) =>{
    console.log('2')
    dispatch({
        type:LOGOUT_USER,
        payload:removeUserStorage()
    })
}

const reducer = (state=init,action) => {
    const {type, payload} = action;
    switch(action.type){
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
            setUserStorage(payload.jwt,payload.user)
            window.location.href = '/my_profile'
            return{
                ...state,
                isAuthenticated:true,
                token:payload.jwt,
                user:payload.u,

            }
        case LOGIN_FAILED:
        case LOGOUT_USER:
            removeUserStorage()
            return{
                ...state,
                isAuthenticated:false,
                token:null,
                user:null 
            }
        case AUTHENTICATION_SUCCESS:
            return{
                ...state,
                isAuthenticated:true,
                token:payload.jwt
            }
        case AUTHENTICATION_FAILED:
            return{
                ...state,
                isAuthenticated:false,
                token:null
                }
        default:
            return state;
    }
}

export default reducer;