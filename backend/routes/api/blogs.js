// backend/routes/api/session.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Blog, User, Post} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { parseTwoDigitYear } = require('moment');
const { Op, Sequelize, where, ValidationError} = require('sequelize');

const router = express.Router();


// Get all blogs
router.get(
    '/',
    async (_req, res) => {
          const blogs = await Blog.findAll({include: [
            {model: User}
          ]});
        
          return res.json({'Blogs': blogs});
    }
  );

  // Get all blogs of the current user
  router.get(
    '/current', requireAuth,
    async (req, res) => {
      const {user} = req;
  
        const userId = req.user.id;
        if(userId !== user.id){
         return res.status(403).json({message: "Forbidden"})
      }
     
          const blogs = await Blog.findAll({where: {userId: user.id}, include: [
            {model: User}
          ]});
  
          console.log('The blogs are ', blogs)
          res.json({"Blogs":blogs});
    }
  );
  
// Get one blog, thats searched
router.get(
   '/:blogId',
   async (req, res) => {
         
         const {blogId} = req.params;
         const blog = await Blog.findOne({where: {id: blogId}, include: [
           {model: User}
         ]});
       
         return res.json({'Blog': blog});
   }
 );





router.post('/', requireAuth, async(req, res) => {
  const {user} = req;

  const existingBlog = await Blog.findOne({
     where: {
       title: req.body.title
     }
  });

  if(existingBlog){
     return res.status(403).json({message: 'A blog with this title already exists'});
  }

   const blog = await Blog.create(
     { 
      userId: user.id,
      title: req.body.title,
      description: req.body.description
     }
 );

   const {createdAt, updatedAt, ...rest} = await blog.toJSON();
   const blogRes = {...rest}
  

   blogRes.createdAt = createdAt.toISOString().replace(/T/,' ').replace(/\..+/,'')
   blogRes.updatedAt = updatedAt.toISOString().replace(/T/, ' ').replace(/\..+/,'')
  
   return res.status(201).json(blogRes);
});




//Test comment for change
router.put('/:blogId', requireAuth, async(req, res) => {
  const blog_id = req.params.blogId;
  const blog= await Blog.findByPk(blog_id);
  if(!blog){
     return res.status(404).json({
      message: "Blog couldn't be found"
    });
   }

   const existingBlog = await Blog.findOne({
     where: {
        title: req.body.title,
     }
  });

   if(existingBlog){
     return res.status(403).json({message: 'Blog with title already exists'});
  }

 
   const userId = req.user.id;
   if(userId !== blog.userId){
      return res.status(403).json({message: "Forbidden"})
   }


  await blog.update(
     { 
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description
     }
 );

 const {createdAt, updatedAt, ...rest} = await blog.toJSON();
  const blogRes = {...rest};
  // spotRes.lat =  parseFloat(spot.lat);
  // spotRes.lng = parseFloat(spot.lng);
  // spotRes.price = parseFloat(spot.price);

  blogRes.createdAt = createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, ' ')
  blogRes.updatedAt = updatedAt.toISOString().replace(/T/, ' ').replace(/\..+/, ' ')

 return res.json(blogRes);
});

//comment for next commit
router.delete('/:blogId', requireAuth, async(req, res) => {
  const blog_id = req.params.blogId;
  const blog = await Blog.findByPk(blog_id);
  if(!blog){
     return res.status(404).json({
      message: "Blog couldn't be found"
    });
   }

   const userId = req.user.id;
   if(userId !== blog.userId){
      return res.status(403).json({message: "Forbidden"})
   }
   
  await blog.destroy();
  return res.json({
     message: "Successfully deleted"
   });
});

router.get('/:blogId/posts', async(req, res) => {
  const {blogId} = req.params;

  const blog = await Blog.findByPk(blogId);
  if(!blog){
     return res.status(404).json({message: "Blog couldn't be found"})
  }
  const blog_posts = await Post.findAll({
     where: {
        blogId: blogId
     }
  });

  const result = [];
  for(let post of blog_posts){
     const {createdAt, updatedAt, ...rest} = await post.toJSON();
     let prettyRes = {...rest}
     prettyRes.createdAt = createdAt.toISOString().replace(/T/,' ').replace(/\..+/,'')
     prettyRes.updatedAt = updatedAt.toISOString().replace(/T/, ' ').replace(/\..+/,'')
     result.push(prettyRes);
  }

  const newPrettyRes = {"Blog":blog, "Posts":result}
 
  return res.json(newPrettyRes);
});



router.post('/:blogId/posts', requireAuth, async(req, res) => {
  const {blogId} = req.params;
 
 const blog = await Blog.findByPk(blogId);
 

 if(!blog){
  return res.status(404).json({
   message: "Blog couldn't be found"
 });
}

  const userId = req.user.id;
  
 
  const blog_post= await Post.create(
     { 
      userId: userId,
      blogId: blogId,
      title: req.body.title,
      postEntry: req.body.postEntry
     }
 );

 const {createdAt, updatedAt, ...rest} = await blog_post.toJSON();
 const prettyRes = {...rest}


  prettyRes.createdAt = createdAt.toISOString().replace(/T/,' ').replace(/\..+/,'')
  prettyRes.updatedAt = updatedAt.toISOString().replace(/T/, ' ').replace(/\..+/,'')


  return res.status(201).json(prettyRes);

});

module.exports = router;