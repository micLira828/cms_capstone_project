import { csrfFetch } from "./csrf";

export const GET_ALL_posts = "posts/getAllPosts";
export const GET_ONE_POST = "posts/getOnePost";
export const ADD_POST = "posts/addPost";
export const EDIT_POST = "posts/updatePost";
export const DELETE_POST = "posts/removePost";
export const GET_BLOG_POSTS= "posts/getBlogPosts";


  //regular action creator
export const loadPost = (post) => {
  return {
    type: GET_ONE_POST,
    payload:post
  };
};

  //regular action creator
  export const loadBlogPosts = (posts) => {
    return {
      type: GET_BLOG_POSTS,
      payload: posts
    };
  };

export const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post
  };
};

export const deletePost = (post) => {
  return {
    type: DELETE_POST,
    payload: post
  };
};

  //regular action creator
  export const editPost= (post) => {
    return {
      type: EDIT_POST,
      payload:post
    };
  };

 // thunk action creator
export const getBlogPosts = (blogId) => async (dispatch) => {

    const response = await fetch(`/api/blogs/${blogId}/posts`);
    if(response.ok){
      const data = await response.json();
      
      dispatch(loadBlogPosts(data.Posts));
      return data;
    }
  };

  // thunk action creator
export const getOnePost = (postId) => async (dispatch) => {

  const response = await fetch(`/api/post/${postId}`);
  if (response.ok) {
    const data = await response.json();
    console.log('The data is', data)
    dispatch(loadPost(data));
  
    return data;
  }
};

export const removePost = (postId) => async (dispatch) => {

    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    }

    // console.log('The post is', post);

    const response = await csrfFetch(`/api/posts/${postId}`, options);
    console.log(response);

    if(response.ok){
      const data = await response.json();
      console.log('The data is', data)
      dispatch(deletePost(postId))
    }
    else{
      throw response;
    }
    
}

export const postPost = (blog, post) => async(dispatch) => {
  
  let options = {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(post)
   }

   const response = await csrfFetch(`/api/blogs/${blog.id}/posts`, options);

   if(response.ok){
     const data = await response.json();
     dispatch(addPost(data))
     return data;
   }
 }

 export const updatePost = (post) => async(dispatch) => {

  let options = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(post)
  }

  console.log(post);
 
  const response = await csrfFetch(`/api/posts/${post.id}`, options);


  
  if(response.ok){
    const data = await response.json();
    console.log('The data is', data)
    dispatch(editPost(data))
    return data;
  }
 }
  // state object
const initialState = {
  byId: {},
  allPosts: []
};

// reducer
const postsReducer = (state = initialState, action) => {
   let newState;
  switch (action.type) {
    case GET_BLOG_POSTS: {
      newState = {...state};
      let posts = action.payload;
      console.log('My posts are ', posts)
      newState.allPosts = posts;
      let newById = {}
      for(let post of posts){
        /*Adding key value pair 
        where spot id is key and 
        spot is value*/
        newById[post.id] = post
      }
      newState.byId = newById;
      console.log('My posts are ', newState);
    
      return newState;
    }
    case GET_ONE_POST: {
      newState = {...state};
      const post = action.payload;
      console.log(post);
      let newById = {};
      newById[post.id] = post;
      newState.byId = newById;
      //newState[allSpots] = [spot];
      return newState;
    }
    case ADD_POST: {
     newState = {...state};
     //Add new spot to byId 
     const post = action.payload;
     newState.byId = {...state.byId};
     const postId = post.id;
     newState.byId[postId] = post;
     newState.allPosts = [...state.allPosts, post];
     return newState;
    }
    case EDIT_POST: {
      newState = {...state};
      //Add new spot to byId 
      const post = action.payload;
      const updatedPosts = newState.allPosts.filter(post => {
        return post.id !== post.id;
      });

      updatedPosts.push(post);
      newState.allPosts = updatedPosts
      console.log(updatedPosts);
      return newState;
    }

    case DELETE_POST: {
      newState = {...state}

      let postId = action.payload;

      const newAllPostsArr = newState.allPosts.filter(post => {
         return post.id !== postId;
      })

      newState.allPosts= newAllPostsArr;
      delete newState.byId[postId];
      return newState;
    }
    
    
    default:
      return state;
  }
};

export default postsReducer;