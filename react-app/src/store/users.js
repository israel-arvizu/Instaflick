const GET_USERS = 'users/GET_ALL_USERS';

//action
const getUsers = (user) => ({
    type: GET_USERS,
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


const initialState = { user: null };

export default function userReducer(state = initialState, action){
    let newState = {}
    switch (action.type) {
        case GET_USERS:
        return {...state, allUsers: action.payload }
        default:
        return state;
    }
}
