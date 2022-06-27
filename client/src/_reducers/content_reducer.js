import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
} from '../_actions/types';

const initialState={
    isLogined:false,
    id:'Stranger'
}
export default function(state=initialState,action){
    switch(action.type){
        case LOGIN_USER:
            if(action.payload.success){
                return { ...state, isLogined:true,id:action.payload.userId }
            }
            return { ...state}
           
        case LOGOUT_USER:
            if(action.payload.success){
                return { ...state,...initialState }
            }
            return { ...state}
        case REGISTER_USER:
            return { ...state}
        default:
            return state;
    }
}