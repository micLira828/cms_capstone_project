import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postSpot} from '../../store/spot';
import categories from './categories'
import { postSpotImage} from '../../store/spotImage';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('General');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
     
      

        const form = {
           title,
           postEntry,
           category
        }
        
        const newBlog = await dispatch(postBlog(form));
       

        navigate(`/blogs/current`);
    }

  
    return (
        <>
         <h2>Create a new blog</h2>
        <form onSubmit={handleSubmit}>
            <h3>Add a snazzy title for your Genius Masterpiece</h3>
          
            <input placeholder = "Title of your Blog" onChange={(e) => setTitle(e.target.value)} value = {title}  type = "text"></input>
            <label>
                Select a Category
            <select
            onChange = {e => setCategory(e.target.value)}
            value = {form.type}
            >
            {categories.map(category => (
            <option
              key={id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </label>
                <h3>Describe your blog to guests</h3>
                <p>Provide a written sneak-preview/intro of the best features of your blog
                    and the topics and subjects that the blog covers that readers will want to
                    know more about, to hook them in 
                </p>
                <textarea placeholder = "Please write at least 30 characters" className = "description" onChange={(e) => setDescription(e.target.value)} value = {description}  rows = "10" cols = "20"></textarea>
                  
            <button className = "redRectangular" type = 'submit'>Create your Blog</button>
        </form>
        </>
    )
}

export default CreateBlog;