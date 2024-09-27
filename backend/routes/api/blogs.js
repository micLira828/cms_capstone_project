// backend/routes/api/session.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Blog, User} = require('../../db/models');

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
        
          return res.json({blogs});
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
   
        const blogs = await Blog.findAll({where: {userId: user.id}});

        console.log('The blogs are ', blogs)
        res.json({blogs});
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




//Just another comment to push something to dev
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

  console.log(req.user, 'had a little lamb')
   const userId = req.body.userId;
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

module.exports = router;