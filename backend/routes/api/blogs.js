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

module.exports = router;