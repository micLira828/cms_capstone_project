import OpenModalButton from '../../OpenModalButton';
import { useSelector } from "react-redux";
import DeletePostModal from "./DeletePostModal";
import UpdatePostModal from "./UpdatePostModal";
import './PostCard.css'

const PostCard = ({post}) => {

    const sessionUser = useSelector((state) => state.session.user);

    
    return (<div className = "card">
    {/* <h4>{review?.User?.firstName}</h4> */}
    {/* <h4>{verbalDate}</h4> */}
     <div className = "content">
     <h4>{post.title}</h4>
     <p>{post.postEntry}</p>
     {sessionUser && sessionUser.id === post.userId ? (<>
        <OpenModalButton 
                 modalComponent = {<UpdatePostModal postId = {post.id}/>}
                 buttonText = {'Update Post'}
                 />
     {<OpenModalButton 
                 modalComponent = {<DeletePostModal postId = {post.id}/>}
                 buttonText = {'Delete Post'}
                /> }
    </>) : ""}
    </div>
    </div>)
   
}

export default PostCard;