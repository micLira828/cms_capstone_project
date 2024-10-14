import {useDispatch, useSelector} from 'react-redux'
import {removeBlog} from '../../store/blog';
import { useModal } from '../../context/Modal';
// import './DeleteModal.css'

const DeleteBlogModal = ({blogId}) =>{
    let blog = useSelector((state) => state.blog.byId[blogId]);
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const deleteTheBlog= (e) => {
        e.preventDefault();
        alert('Deleted!');
        dispatch(removeBlog(blog)).then(closeModal)
    }
    
    return (<div className = "deleteModalContainer">
        <p>Are you sure you want to
        remove this blog?</p>
        <button onClick = {deleteTheBlog}>Yes(Delete Blog)</button>
        <button  onClick = {closeModal}>No(Keep Blog)</button>
    </div>)
    
}

export default DeleteBlogModal