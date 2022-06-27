import axios from 'axios';
import {
    READ_CONTENT,
    CREATE_CONTENT,
    UPDATE_CONTENT,
    DELETE_CONTENT
} from './types';
import { SERVER } from '../components/config';

export function readContent(dataToSubmit){
    const data= axios.get(`${SERVER}/content/read/${dataToSubmit.seq}`).then(res=> res.data);
    return {
        type: READ_CONTENT,
        payload: data
    }
}
export function createContent(dataToSubmit){
    const data= axios.post(`${SERVER}/content/create`,dataToSubmit).then(res=> res.data);
    return {
        type: CREATE_CONTENT,
        payload: data
    }
}

export function deleteContent(dataToSubmit){
    const data= axios.post(`${SERVER}/content/delete/${dataToSubmit.seq}`).then(res=> res.data);
    return {    
        type: DELETE_CONTENT,
        payload: data
    }
}