import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {updateBlog, getOneBlog} from "../../store/blog";
import categories from './categories.json'
// import './UpdateSpotModal.css';
const UpdateBlogForm = () => {
  const {blogId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('The blogId is', blogId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const blog = dispatch(getOneBlog(blogId));

    setTitle(blog.title);
    setDescription(blog.description)
    setCategory(blog.category)
  }, [dispatch])

  let blog = useSelector((state) => state.blog.byId);
  console.log(`The blog of ${blogId} is`, blog)
 
  let sessionUser = useSelector((state) => state.session.user);


  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = {
      "id":blogId,
      "userId": sessionUser.id,
      "title": title,
      "category": category,
      "description": description,
      
    }
    console.log(form);
    
    const editedBlog =  await dispatch(updateBlog(form));
    console.log(editedBlog);
    navigate(`/blogs/current`);
  }

  return (
    <>
      <form>
          <h3>Create a title for your blog</h3>
          <p>Catch readers&apos; attention with a snappy
            title that highlights what makes it special
          </p>
            <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
          ></input>


        <h3>Describe your blog to readers</h3>
         <p>Mention any best features of your blog,
            any special topics and subjects you
            will be discussing that your audience
            would want to know about
         </p>
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
         <label htmlFor="description">Description</label>
          <textarea className = "description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows="10"
            cols="20"
          ></textarea>
         
     
          
         
        <button onClick={handleSubmit} type="submit">Update the spot</button>
      </form>
    </>
  );
};

export default UpdateBlogForm;
