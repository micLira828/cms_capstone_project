
import { useNavigate} from 'react-router-dom';

const Card = ({blog}) => {// optional: callback function that will be called once the modal is closed}) => {
   const navigate = useNavigate();

   const navigateToPost = () => {
    navigate(`/blogs/${blog.id}/posts`)
   }
  
  return (
    //   <Link className = "blogCard" to ={`/blogs/${blog.id}/posts`}>
        <div className = 'card'>
         <div className = 'cardBody'>
            <h4>{blog.title}</h4> 
            <p><em>{blog.description}</em></p>
         </div>
         <button onClick = {navigateToPost} className = "blogCard">View Posts</button>
        </div>
        // </Link>
    );
}
export default Card;