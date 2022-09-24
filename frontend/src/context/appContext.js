import React, {useReducer,useContext} from 'react'
import reducer from './reducer'
import axios from 'axios'
import {
    DISPLAY_ALERT,
    
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER,
    CLEAR_ALERT,
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

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
    isLoading:false,
    showAlert:false,
    alertText:'',
    alertType:'',
    user: user ? JSON.parse(user): null,
    token: token,
    showSidebar:false,
    isEditing:false,
    editGoalId:'',
    editMemberId:'',
    goals:[],
    content:'',
    search:'',
    sort:'latest',
    sortOptions:['latest','oldest','a-z','z-a'],
    numOfPages:1,
    page:1,
    totalGoals:0,
    
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)

    //axios
    const authFetch = axios.create({
        baseURL: '/api/v1',
    })

    //request
    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    //response
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if(error.response.status === 401){
                logoutUser()
            }
            return Promise.reject(error)
        }
    )

    const displayAlert = () => {
        dispatch({type:DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type:CLEAR_ALERT})
        },3000)
    }

    const addUserToLocalStorage = ({user,token}) => {
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)        
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const setupUser = async({currentUser, endPoint, alertText}) => {
        dispatch({type:SETUP_USER_BEGIN})
        try{
            const{data} = await axios.post(`/api/v1/members/${endPoint}`,currentUser)
            const {user,token} = data
            dispatch({
                type:SETUP_USER_SUCCESS,
                payload: {user,token,alertText},
            })
            addUserToLocalStorage({user,token})
        }
        catch(err){
            console.log(err)
            dispatch({
                type:SETUP_USER_ERROR,
                payload: {msg: err.response.data.msg}
            })
        }
        clearAlert()
    }

    const updateUser = async({currentUser}) => {
        dispatch({type:UPDATE_USER_BEGIN})
        try{
            
            const {data} = await authFetch.patch(`/members/631a5568fa689b5d3cf3f47e`,currentUser)
            const {user,token} = data
            dispatch({
                type:UPDATE_USER_SUCCESS,
                payload:{user,token}
            })
        }
        catch(error){
            if(error.response.status !== 401){
                dispatch({
                    type:UPDATE_USER_ERROR,
                    payload: {msg:error.response.data.msg}
                })
            }
        }
        clearAlert()
    }

    const logoutUser = () => {
        dispatch({type:LOGOUT_USER})
        removeUserFromLocalStorage()
    }

    const getGoals = async() => {
        const{search,sort,page} = state
        let url = `/goals?page=${page}&sort=${sort}`
        if(search){
            url = url + `&search=${search}`
        }
        dispatch({type:GET_GOALS_BEGIN})
        try{
            const {data} = await authFetch(url)
            const {goals,totalGoals,numOfPages} = data
            dispatch({
                type:GET_GOALS_SUCCESS,
                payload:{
                    goals,
                    totalGoals,
                    numOfPages
                }
            })

        }
        catch(error){
            logoutUser()
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({type:TOGGLE_SIDEBAR})
    }

    const setEditGoal = (id) => {
        dispatch({type:SET_EDIT_GOAL,payload:{id}})
    }
    
    const handleChange = ({name,value}) => {
        dispatch({type:HANDLE_CHANGE,payload:{name,value}})
    }

    const clearValues = () => {
        dispatch({type:CLEAR_VALUES})
    }

    const createGoal = async() => {
        dispatch({type:CREATE_GOAL_BEGIN})
        try{
            const {content} = state
            await authFetch.post('/goals',{
                content
            })
            dispatch({type:CREATE_GOAL_SUCCESS})
            dispatch({type:CLEAR_VALUES})
        }
        catch(error){
            if(error.response.status === 401) return
            dispatch({
                type:CREATE_GOAL_ERROR,
                payload:{msg: error.response.data.msg}
            })
        }
        clearAlert()
    }

    const editGoal = async() => {
        dispatch({type:EDIT_GOAL_BEGIN})
        try{
            const {content} = state
            await authFetch.patch(`/goals/${state.editGoalId}`,{content})
            dispatch({type:EDIT_GOAL_SUCCESS})
            dispatch({type:CLEAR_VALUES})

        }
        catch(error){
            if(error.response.status === 401) return
            dispatch({
                type:EDIT_GOAL_ERROR,
                payload:{msg:error.response.data.msg}
            })
        }
        clearAlert()
    }

    const deleteGoal = async(goalId) => {
        dispatch({type:DELETE_GOAL_BEGIN})
        try{
            await authFetch.delete(`/goals/${goalId}`)
            getGoals()
        }
        catch(error){
            logoutUser()
        }
    }

    const clearFilter = () => {
        dispatch({type:CLEAR_FILTER})
    }

    const changePage = (page) => {
        dispatch({type:CHANGE_PAGE,payload:{page}})
    }

    return(
        <AppContext.Provider
            value = {{
                ...state,
                displayAlert,
                setupUser,
                logoutUser,
                getGoals,
                toggleSidebar,
                setEditGoal,
                handleChange,
                clearValues,
                createGoal,
                editGoal,
                deleteGoal,
                updateUser,
                clearFilter,
                changePage
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider,initialState,useAppContext}