import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {updatePost, getOnePost} from '../../../store/post';
// import {useNavigate} from 'react-router-dom';
import {useModal} from '../../../context/Modal';

// import './UpdateReviewModal.css';

const UpdatePostModal = ({postId}) => {
    console.log(postId);
    // const navigate = useNavigate();

    let post = useSelector(state => state.post.byId[postId])
    // let post = useSelector((state) => state.allPosts[postId]);
    //test comment
  console.log('The post is', post);

    const [title, setTitle] = useState(post.title);
    const [postEntry, setPostEntry] = useState(post.postEntry);

    const {closeModal} = useModal();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOnePost(postId))

            .then((data) => {
                // console.log('Data ', data)
                setTitle(data.title)
                setPostEntry(data.postEntry)
            })
    }, [dispatch])
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = {
            "id": postId,
            title,
            postEntry,

        };

        try {
            await dispatch(updatePost(form)).then(closeModal); // Navigate back to the product details page
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    }
  
    return (
        <div className = "postsModalContainer">
         <h2>Update your genius!</h2>
        <form onSubmit={handleSubmit}>
            <label> Title
            <input value = {title}  onChange={(e) => setTitle (e.target.value)} placeholder = {title} type ="text" />
            </label>
            <label>Entry
            <textarea value = {postEntry}  onChange={(e) => setPostEntry (e.target.value)} placeholder = {postEntry} type ="text" />
            </label>
                {/* <input value = {stars}  onChange={(e) => setStars(e.target.value)} placeholder = "Stars" type ="number"></input> */}
           <button type = 'submit'>Create a Post</button>
        </form>
        </div>
    )
}

export default UpdatePostModal;