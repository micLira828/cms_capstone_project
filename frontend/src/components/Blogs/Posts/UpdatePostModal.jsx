import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { updatePost} from '../../../store/post';
import {useModal} from '../../../context/Modal';

// import './UpdateReviewModal.css';

const UpdatePostModal = ({postId}) => {

    let rev = useSelector((state) => state.posts.byId[postId]);

    const [title, setTitle] = useState(rev.title);
    const [postEntry, setPostEntry] = useState(rev.postEntry);

    const {closeModal} = useModal();

    const dispatch = useDispatch();
   
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const post = {
           "id": postId,
           title,
           "postEntry":postEntry
        }
        console.log(post);
        return dispatch(updatePost(post))
        .then(closeModal());
    }

  
    return (
        <div className = "postsModalContainer">
         <h2>Lets make our masterpiece even more genius!</h2>
        <form onSubmit={handleSubmit}>
            <input value = {title}  onChange={(e) => setTitle (e.target.value)} placeholder = "Title" type ="text" />
            <textarea value = {postEntry}  onChange={(e) => setPostEntry (e.target.value)} placeholder = "Post" type ="text" />
                {/* <input value = {stars}  onChange={(e) => setStars(e.target.value)} placeholder = "Stars" type ="number"></input> */}
           <button type = 'submit'>Create a Post</button>
        </form>
        </div>
    )
}

export default UpdatePostModal;