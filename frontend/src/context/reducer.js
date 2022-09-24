import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER,
    GET_GOALS_BEGIN,
    GET_GOALS_SUCCESS,
    TOGGLE_SIDEBAR,
    SET_EDIT_GOAL,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_GOAL_BEGIN,
    CREATE_GOAL_SUCCESS,
    CREATE_GOAL_ERROR,
    EDIT_GOAL_BEGIN,
    EDIT_GOAL_SUCCESS,
    EDIT_GOAL_ERROR,
    DELETE_GOAL_BEGIN,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    CLEAR_FILTER,
    CHANGE_PAGE

} from './actions'

import {initialState} from './appContext'

const reducer = (state,action) => {
    if(action.type === DISPLAY_ALERT){
        return{
            ...state,
            showAlert:true,
            alertType:'danger',
            alertText:'Please provide all values!'
        }
    }

    if(action.type === SETUP_USER_BEGIN){
        return{
            ...state,
            isLoading:true 
        }
    }

    if(action.type === SETUP_USER_SUCCESS){
        return{
            ...state,
            isLoading:true,
            token: action.payload.token,
            user:action.payload.user,
            userLocation:action.payload.location,
            jobLocation:action.payload.location,
            showAlert:true,
            alertType:'success',
            alertText:action.payload.alertText
        }
    }

    if(action.type===LOGOUT_USER){
        return{
            ...initialState,
            user:null,
            token:null,
            jobLocation: '',
            userLocation: ''
        }   
    }
    if(action.type===CLEAR_ALERT){
        return{
            ...state,
            isLoading:false,
            showAlert:false,
            alertType:'',
            alertText:''
        }
    }
    if(action.type === SETUP_USER_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg

        }
    }
    if(action.type === GET_GOALS_BEGIN){
        return{
            ...state,
            isLoading:true,
            showAlert:false
        }
    }
    if(action.type === GET_GOALS_SUCCESS){
        return{
            ...state,
            isLoading:false,
            goals: action.payload.goals,
            totalGoals:action.payload.totalGoals,
            numOfPages:action.payload.numOfPages
        }
    }
    if(action.type === TOGGLE_SIDEBAR){
        return{
            ...state,
            showSidebar: !state.showSidebar
        }
    }

    if(action.type === SET_EDIT_GOAL){
        const goal = state.goals.find((goal) => goal._id === action.payload.id)
        const {_id,content} = goal
        return{
            ...state,
            isEditting: true,
            editGoalId: _id,
            content
        }
    }

    if(action.type === HANDLE_CHANGE){
        return {
            ...state,
            page:1,
            [action.payload.name]: action.payload.value
        }
    }

    if(action.type === CLEAR_VALUES){
        const initialState = {
            isEditting:false,
            editGoalId: '',
            content:'',

        }
        return{
            ...state,
            ...initialState
        }
    }
    if(action.type === CREATE_GOAL_BEGIN) {
        return{...state,isLoading: true}
    }

    if(action.type === CREATE_GOAL_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'New goal created!'
        }
    }
    if(action.type === CREATE_GOAL_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg
        }
    }

    if(action.type === EDIT_GOAL_BEGIN){
        return{
            ...state,
            isLoading:true
        }

    }

    if(action.type === EDIT_GOAL_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Goal updated!'
        }
    }
    
    if(action.type === EDIT_GOAL_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg
        }
    }
    if(action.type === DELETE_GOAL_BEGIN){
        return{
            ...state,
            isLoading:true
        }
    }

    if(action.type === UPDATE_USER_BEGIN) {
        return{
            ...state,
            isLoading:true
        }
    }

    if(action.type === UPDATE_USER_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'User updated!'
        }
    }

    if(action.type === UPDATE_USER_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg
        }
    }

    if(action.type === CLEAR_FILTER){
        return{
            ...state,
            search:'',
            sort:'latest'
        }
    }

    if(action.type === CHANGE_PAGE){
        return{
            ...state,
            page:action.payload.page
        }
    }
}

export default reducer