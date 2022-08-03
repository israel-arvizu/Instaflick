const ADD_COMMENT = 'comments/ADD_COMMENT'
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'

const addComment = (comments) => ({
    type: ADD_COMMENT,
    payload: comments
})

const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    payload: comments
})

export const addSingleComment = (comment, userId, postId) => async (dispatch) => {
    const response = await fetch('/api/comments/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment, userId, postId})
    })

    if(response.ok){
        const comments = await response.json()
        dispatch(addComment(comments))
        return null
    } else {
        return ['An error occurred. Please refresh and try again']
    }
}

export const loadPostComments = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comments/post/${postId}`)

    if(response.ok){
        const comments = await response.json()
        dispatch(loadComments(comments))
        return null
    } else {
        return ['An error occurred. Please refresh and try again']
    }
}

let initialState = {}
export default function commentReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_COMMENT:
            newState = {...state, postComments: action.payload}
            return newState;
        case LOAD_COMMENTS:
            newState = {...state, postComments: action.payload}
            return newState;
        default:
            return state
    }
}
