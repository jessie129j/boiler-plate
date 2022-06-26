import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
} from './types';
import { SERVER } from '../components/config';

export function registerUser(dataToSubmit){
    const data= axios.post(`${SERVER}/user/register`,dataToSubmit).then(res=> res.data);
    return {
        type: REGISTER_USER,
        payload: data
    }
}

export function loginUser(dataToSubmit){
    const data = axios.post(`${SERVER}/user/login`,dataToSubmit).then(res => res.data);
    return {
        type: LOGIN_USER,
        payload: data
    }
}

export function logoutUser(){
    const data = axios.get(`${SERVER}/user/logout`).then(res => res.data);
    return {
        type: LOGOUT_USER,
        payload: data
    }
}