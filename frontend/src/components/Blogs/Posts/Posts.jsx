

import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from './PostCard';
import { getBlogPosts } from '../../../store/post';

import OpenModalButton from '../../OpenModalButton';
// import { useModal } from '../../context/Modal';

// import './Reviews.css';
import CreatePostModal from './CreatePostModal';
const Posts = ({blog}) => {
  const dispatch = useDispatch();

  let sessionUser = useSelector((state) => state.session.user);


  let blogPosts = useSelector((state) => state.allPosts);
  
  
  useEffect(() => {
    dispatch(getBlogPosts({blog}));
  }, [dispatch, blog])



  const usersPost = sessionUser ? blogPosts.find(post => {return post.userId === sessionUser.id}) : undefined;

  return (
    <>
      <div className = "posts">
       
       {sessionUser && blog.userId === sessionUser.id 
       && !usersPost ? ( <><OpenModalButton className = "modalRedRectangular"
        modalComponent = {<CreatePostModal blog = {blog}/>}
        buttonText = {'Create a post'}
       /></>) 
       : ""}
        {blogPosts.map((post) => <PostCard post = {post} key = {post.id}/>)}
        {blogPosts.length < 1 ? <p>Create your first post!</p> : ""}
      </div>
    {/* if user id matches current users if and if there is a user */}
   
    </>
  )
}

export default Posts;
