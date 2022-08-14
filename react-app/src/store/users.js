const GET_USERS = 'users/GET_ALL_USERS';
const LOAD_USER = 'users/LOAD_USERS';

//action
const getUsers = (user) => ({
    type: GET_USERS,
    payload: user
})

const getSingleUser = (user) => ({
    type: LOAD_USER,
    payload: user
})


export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('api/users/getAllUsers')
    if (response.ok) {
        const data = await response.json();
        dispatch(getUsers(data))
        return null;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getUser = (username) => async (dispatch) => {
    const response = await fetch(`/api/users/load/${username}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleUser(data))
        return null;
    } else if(response.status === 400){
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}


const initialState = { user: null };

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_USERS:
            return {...state, allUsers: action.payload }
        case LOAD_USER:
            return {...state, selected: action.payload}
        default:
            return state;
    }
}
