import {useDispatch, useSelector} from 'react-redux'
import {removeSpot} from '../../store/spot';
import { useModal } from '../../context/Modal';
import './DeleteModal.css'

const DeleteBlogModal = ({blogId}) =>{
    let blog = useSelector((state) => state.blogs.byId[blogId]);
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const deleteTheSpot = (e) => {
        e.preventDefault();
        alert('Cold Syrup!');
        dispatch(removeBlog(blog)).then(closeModal)
    }
    
    return (<div className = "deleteModalContainer">
        <p>Are you sure you want to
        remove this blog?</p>
        <button onClick = {deleteTheSpot}>Yes(Delete Blog)</button>
        <button  onClick = {closeModal}>No(Keep Blog)</button>
    </div>)
    
}

export default DeleteBlogModal