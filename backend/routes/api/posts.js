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


router.put('/:postId', requireAuth, async(req, res, next) =>{
    const {postId} = req.params;
    const post = await Post.findByPk(postId)
    if(!post){
      return res.status(404).json({message: "Post couldn't be found"})
   }
   const userId = req.user.id;
   if(userId !== post.userId){
     return res.status(403).json({message: "Forbidden"})
  }
   
    await post.update(
      { 
        userId: req.body.userId, 
        blogId: req.body.blogId,
        postEntry: req.body.postEntry,
        title: req.body.title
      }
  );

  const {createdAt, updatedAt, ...rest} = await post.toJSON();
  const prettyRes = {...rest}
  prettyRes.createdAt = createdAt.toISOString().replace(/T/,' ').replace(/\..+/,'')
  prettyRes.updatedAt = updatedAt.toISOString().replace(/T/, ' ').replace(/\..+/,'')
  return res.json(prettyRes);
});

router.delete('/:postId', requireAuth, async(req, res) =>{
  const {postId} = req.params;
   
  const post = await Post.findByPk(postId);
  if(!post){
    return res.status(404).json({message: "Review couldn't be found"})
 }
 const userId = req.user.id;
 if(userId !== post.userId){
  return res.status(403).json({message: "Forbidden"})
}
  await post.destroy();

  return res.json({message: "Successfully deleted"})

});

module.exports = router;