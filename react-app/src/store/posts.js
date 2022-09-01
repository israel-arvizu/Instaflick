const NEW_POST = 'posts/NEW_POST';
const LOAD_POSTS = 'posts/LOAD_RECENT_POST';
const LOAD_USERS_POST = 'posts/LOAD_USERS_POST'

//ACTIONS
const setPost = (post) => ({
    type: NEW_POST,
    payload: post
})

const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  payload: posts
})

const usersPost = (posts) => ({
  type: LOAD_USERS_POST,
  payload: posts
})

//THUNKER
export const createPost = (postData) => async (dispatch) => {
  const response = await fetch('/api/posts/new', {
    method: 'POST',
    body: postData
  })


  if (response.ok) {
    const data = await response.json();
    dispatch(setPost(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }


};

export const deletePost = (id, userId) => async (dispatch) => {
  console.log('DELETING', userId)
  const response = await fetch(`/api/posts/delete/${id}`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userId)
  })

  if (response.ok){
    const data = await response.json()
    dispatch(usersPost(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateCaption = (caption, postId) => async (dispatch) => {
  const response = await fetch(`api/posts/update/${postId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({caption, postId})
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(usersPost(data))
    return null;
  }else {
    return ['An error occurred. Please try again.']
  }
}

export const getRecentPost = () => async (dispatch) => {
  const response = await fetch('/api/posts/get')

  if (response.ok) {
    const data = await response.json();
    dispatch(loadPosts(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

};

export const getUsersPost = (userId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${userId}`)

  if (response.ok) {
    const data = await response.json();
    dispatch(usersPost(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateLikes = (userId, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`,{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({userId, postId})
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(loadPosts(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}


let initialState = {}
export default function postReducer(state=initialState, action) {
    let newState;
    switch(action.type){
        case NEW_POST:
            newState = {...state, newPost: action.payload}
            return newState;
        case LOAD_POSTS:
            newState = {...state, recentPosts: action.payload}
            return newState;
        case LOAD_USERS_POST:
            newState = {...state, userPosts: action.payload}
            return newState
        default:
            return state;
    }
}
