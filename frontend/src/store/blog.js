import { csrfFetch } from "./csrf";

export const GET_ALL_BLOGS= "blogs/getAllBlogs";
export const GET_ONE_BLOG = "blogs/getOneBlog";
export const ADD_BLOG = "blogs/postBlog";
export const EDIT_BLOG = "blogs/updateBlog";
export const DELETE_BLOG= "blogs/removeBlogs";

//regular action creator
const loadBlogs = (blogs) => {
    return {
      type: GET_ALL_BLOGS,
      payload: blogs
    };
  };

  //regular action creator
export const loadBlog = (blog) => {
  return {
    type: GET_ONE_BLOG,
    payload:blog
  };
};

export const addBlog = (blog) => {
  return {
    type: ADD_BLOG,
    payload: blog
  };
};

export const deleteBlog = (blog) => {
  return {
    type: DELETE_BLOG,
    payload: blog
  };
};

  //regular action creator
  export const editBlog = (blog) => {
    return {
      type: EDIT_BLoG,
      payload:blog
    };
  };

  // thunk action creator
export const getAllBlogs = () => async (dispatch) => {
    const response = await fetch('/api/blogs/');


    if(response.ok){
      const data = await response.json();
      dispatch(loadBlogs(data.Blogs));
      return data;
    }
    
  };

  export const getOneBlog = (blogId) => async (dispatch) => {
    
  
    const response = await fetch(`/api/blogs/${blogId}`);

    if (response.ok) {
      const data = await response.json();
     
      dispatch(loadBlog(data));
      console.log('The new blog data is', data)
      return data;
    }
  };
  

export const removeBlog = (blog) => async(dispatch) => {
    const blogId = blog.id;
    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(blog)
    }

    const response = await csrfFetch(`/api/blog/${blog.id}`, options);

    if(response.ok){
      const data = await response.json();
      dispatch(deleteBlog(blogId))
    }
    else{
      throw response;
    }
    
}

export const postBlog = (blog) => async(dispatch) => {

  const {title, userId, description} = blog;

  let options = {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       title: title,
       description: description,
       userId: parseInt(userId)
    })
   }
   
   const response = await csrfFetch('/api/blogs', options);

   if(response.ok){
     const data = await response.json();
    
     dispatch(addBlog(data))
     return data;
   }
 }

 export const updateSpot = (blog) => async(dispatch) => {

  let options = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(blog)
  }

 
  const response = await csrfFetch(`/api/blogs/${blog.id}`, options);

  
  if(response.ok){
    const data = await response.json();
    dispatch(editBlog(data));
    return data;
  }
 }

  // state object
const initialState = {
    byId: {},
    allBlogs: []
  };
  
  // reducer
  const blogsReducer = (state = initialState, action) => {
     let newState;
    switch (action.type) {
      case GET_ALL_BLOGS: {
        newState = {...state};
        let blogs = action.payload
        newState.allBlogs = blogs
        let newById = {}
        for(let blog of blogs){
          /*Adding key value pair 
          where spot id is key and 
          spot is value*/
          newById[blog.id] = blog
        }
        newState.byId = newById;
        return newState;
      }
      case GET_ONE_BLOG: {
        newState = {...state};
        const blog = action.payload;
      
        let newById = {};
        newById[blog.id] = blog;
        newState.byId = newById;
        //newState[allSpots] = [spot];
        return newState;
      }
      case ADD_BLOG: {
       newState = {...state};
       //Add new spot to byId 
       const spot = action.payload;
       newState.byId = {...state.byId};
       const blogId = blog.id;
       newState.byId[blogId] = blog;
       newState.allBlog= [...state.allBlogs, blog];
       return newState;
      }
      case EDIT_SPOT: {
        newState = {...state};
        //Add new spot to byId 
        const blog= action.payload;
        const updatedBlogs = newState.allBlogs.filter(blg => {
          return blg.id !== blog.id;
        });
  
        updatedBlogs.push(blog);
        newState.allBlogs = updatedBlogs;
     
        return newState;
      }
  
      case DELETE_SPOT: {
        newState = {...state}
  
        let blogId = action.payload;
  
        const newAllBlogsArr = newState.allBlogs.filter(blg => {
           return blg.id !== blogId;
        })
  
        newState.allBlogs= newAllBlogsArr;
        delete newState.byId[blogId];
        return newState;
      }
      
  
      default:
        return state;
    }
  };
  
  export default blogsReducer;
 