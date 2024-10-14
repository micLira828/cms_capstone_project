import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postBlog, getOneBlog} from '../../store/blog';
import categories from './categories'


const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('General');
    const sessionUser = useSelector((state) => state.session.user);
    // let blog = useSelector((state) => state.blog.byId[blogId]);

    const navigate = useNavigate();

    const dispatch = useDispatch();
  
    const handleSubmit = async(e) => {
        e.preventDefault();
     
        const form = {
           userId: sessionUser.id,
           title,
           description,
           category
        }
        
      const newBlog = await dispatch(postBlog(form));
      console.log('The blog is totally ', newBlog)
      const blog = await dispatch(getOneBlog(newBlog.id));
    //   const blog = newProcessedBlog.blog;
    //   console.log('My Blog is now ', newProcessedBlog.Blog )

     
    
      navigate(`/blogs/${blog.id}/posts`);

    }

  
    return (
        <div className = "form">
         <h2>Create a new blog</h2>
        <form onSubmit={handleSubmit}>
            <h3>Add a snazzy title for your Genius Masterpiece</h3>
          
           <label>Title
            <input placeholder = "Title of your Blog" onChange={(e) => setTitle(e.target.value)} value = {title}  type = "text"></input>
            </label>
            <label>
                Select a Category
            <select
            onChange = {e => setCategory(e.target.value)}
            value = {category}
            >
            {categories.map(category => (
            <option
              key={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </label>
                <h3>Describe your blog to guests</h3>
                <p>Provide a written sneak-preview/intro of the 
                  the blog, to hook them in 
                </p>
                <label>Description
               
                </label>
                <textarea placeholder = "Please write at least 30 characters" className = "description" onChange={(e) => setDescription(e.target.value)} value = {description}  rows = "10" cols = "20"></textarea>
                  
            <button  type = 'submit'>Create a Blog</button>
        </form>
        </div>
    )
}

export default CreateBlog;