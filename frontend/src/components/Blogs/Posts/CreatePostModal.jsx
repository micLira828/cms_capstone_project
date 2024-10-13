import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { useModal } from '../../../context/Modal';
import { postPost} from '../../../store/post';

// import './CreateReviewModal.css';

const CreatePostModal = ({blog}) => {
    const [title, setTitle] = useState('');
    const [postEntry, setPostEntry] = useState('');
    const {closeModal} = useModal();
    const [buttonOut, setButtonOut] = useState(true);
    
    const dispatch = useDispatch();
   
    useEffect(() => {
        setButtonOut(true);
        if(postEntry.length >= 200 && title){
            setButtonOut(false);
        }
    }, [postEntry, title])
  
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const form = {
           title,
           postEntry
        }
        console.log(form);
      
        dispatch(postPost(blog, form)).then(closeModal);
    }

  
    return (
        <div className = "form">
         <h2>Write your genuis masterpiece here</h2>
        <form onSubmit={handleSubmit}>
            <label>Title
            <input value = {title}  onChange={(e) => setTitle(e.target.value)} type ="text" />
            </label>
            <label>Entry
            <textarea placeholder = "Write your post here..." value = {postEntry}  onChange={(e) => setPostEntry(e.target.value)} type ="text" />
            </label>
           
        
                {/* <input value = {stars}  onChange={(e) => setStars(e.target.value)} placeholder = "Stars" type ="number"></input> */}
           <button disabled = {buttonOut ? true: false} type = 'submit'>Submit Your Post</button>
        </form>
        </div>
    )
}

export default CreatePostModal;