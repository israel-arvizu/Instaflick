const NEW_POST = 'posts/NEW_POST';
const LOAD_POSTS = 'posts/LOAD_RECENT_POST';

//ACTIONS
const setPost = (post) => ({
    type: NEW_POST,
    payload: post
})

const loadPosts = (posts) => ({
  type: LOAD_POSTS,
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
        default:
            return state;
    }
}
