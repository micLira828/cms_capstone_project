import { csrfFetch } from "./csrf";

export const GET_ALL_BLOGS= "blogs/getAllBlogs";
export const GET_ONE_BLOG = "blogs/getOneBlog";
export const GET_USERS_BLOGS = "blogs/getUsersBlogs";
export const GET_CURRENT_USERS_BLOGS = "blogs/getCurrentUsersBlogs";
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

  const loadUsersBlogs = (usersBlogs) => {
    return {
      type: GET_USERS_BLOGS,
      payload: usersBlogs
    };
  };


  const loadCurrentUsersBlogs = (currentUsersBlogs) => {
    return {
      type: GET_CURRENT_USERS_BLOGS,
      payload: currentUsersBlogs
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
      type: EDIT_BLOG,
      payload:blog
    };
  };

  // thunk action creator
export const getAllBlogs = () => async (dispatch) => {
    const response = await csrfFetch('/api/blogs');
    if(response.ok){
     
      const data = await response.json();
      console.log('The blogs are ', data)
      dispatch(loadBlogs(data.Blogs));
      return data;
    }
  };

     // thunk action creator
export const getUsersBlogs = (userId) => async (dispatch) => {
 
  const response = await csrfFetch(`/api/users/${userId}/blogs`);
  if(response.ok){
   
    const data = await response.json();
    console.log('The blogs are ', data)
    dispatch(loadUsersBlogs(data.Blogs));
    return data;
  }
};


     // thunk action creator
     export const getCurrentUsersBlogs = () => async (dispatch) => {
 
      const response = await csrfFetch(`/api/blogs/current`);
      if(response.ok){
       
        const data = await response.json();
        console.log('The blogs are ', data)
        dispatch(loadCurrentUsersBlogs(data.Blogs));
        return data;
      }
    };

  export const getOneBlog = (blogId) => async (dispatch) => {
    
    blogId = parseInt(blogId);
  
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

    const response = await csrfFetch(`/api/blogs/${blog.id}`, options);

    if(response.ok){
      // const data = await response.json();
      dispatch(deleteBlog(blogId))
    }
    else{
      throw response;
    }
    
}

export const postBlog = (blog) => async(dispatch) => {

  const {title, userId, description, category} = blog;

  let options = {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       title: title,
       description: description,
       category: category,
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

 export const updateBlog = (blog) => async(dispatch) => {

  console.log('The blog is ', blog)
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
        let newState = {...state};
        console.log('The payload is ', action.payload);
        let blogs = action.payload;
        newState.allBlogs = blogs
        let newById = {}
        for(let blog of blogs){
         
          newById[blog.id] = blog
        }
        newState.byId = newById;
        return newState;
      }
      case GET_USERS_BLOGS: {
        let newState = {...state};
        console.log('The payload is ', action.payload);
        let usersBlogs = action.payload;
        newState.allBlogs = usersBlogs
        let newById = {}
        for(let blog of usersBlogs){
         
          newById[blog.id] = blog
        }
        newState.byId = newById;
        return newState;
      }


      case GET_CURRENT_USERS_BLOGS: {
        let newState = {...state};
        console.log('The payload is ', action.payload);
        let currentUsersBlogs = action.payload;
        newState.allBlogs = currentUsersBlogs
        let newById = {}
        for(let blog of currentUsersBlogs){
         
          newById[blog.id] = blog
        }
        newState.byId = newById;
        return newState;
      }
      case GET_ONE_BLOG: {
        let newState = {...state};
        const blog = action.payload;
        newState.byId[blog.id] = blog;
        console.log(newState);
        return newState;
      }
      case ADD_BLOG: {
       newState = {...state};
       //Add new blog to byId 
       const blog = action.payload;
       newState.byId = {...state.byId};
       const blogId = blog.id;
       newState.byId[blogId] = blog;
       newState.allBlog= [...state.allBlogs, blog];
       return newState;
      }
      case EDIT_BLOG: {
        newState = {...state};
        //Add new spot to byId 
        const blog= action.payload;
        const updatedBlogs = newState.allBlogs.filter(blg => {
          return blg.id !== blog.id;
        });
  
        updatedBlogs.push(blog);
        newState.allBlogs = updatedBlogs;
        newState.byId = {...state.byId}
       
        newState.byId[blog.Id] = blog;
        console.log('The blog is ', newState.byId[blog.id])
        return newState;
      }
  
      case DELETE_BLOG: {
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
 