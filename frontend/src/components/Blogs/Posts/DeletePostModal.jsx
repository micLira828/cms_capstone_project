import {useDispatch} from 'react-redux'
import { removePost} from '../../../store/post';
import { useModal } from '../../../context/Modal';
// import './DeletePostModal.css'

const DeletePostModal = ({postId}) =>{
    // let post = useSelector((state) => state.posts.byId[postId]);
  
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const deleteThePost = (e) => {
        e.preventDefault();
        alert('Cold Syrup!');
        dispatch(removePost(postId)).then(closeModal)
    }
    
    return (<div className = "postsModalContainer">
        <p>Are you sure you want to delete this post?</p>
        <button className = "redRectangular deleteButton" onClick = {deleteThePost}>Yes(Delete Post)</button>
        <button className = "deleteButton" onClick = {closeModal}>No(Keep Post)</button>
    </div>)
    
}

export default DeletePostModal;