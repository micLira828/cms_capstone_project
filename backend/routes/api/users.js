const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Blog } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');
// ...
const router = express.Router();

// backend/routes/api/users.js
// ...
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// backend/routes/api/users.js
// ...
 // Get all blogs of a user
 router.get(
  '/:userId/blogs',
  async (req, res) => {
    const {userId} = req.params;

    console.log ('The user is ', userId)
   
    const user = await User.findOne({where: {id: userId}});

    if(!user){
        return res.status(404).json({message: "Sorry! User Not Found!"})
    }

      const blogs = await Blog.findAll({where: {userId: user.id}, include: [
        {model: User}
      ]});

      console.log('The blogs are ', blogs)
      res.json({"Blogs":blogs});
  }
);

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName} = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, firstName, lastName, hashedPassword });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };

    await setTokenCookie(res, safeUser);
    //hopopo
    return res.json({
      user: safeUser
    });
  }
);



// backend/routes/api/users.js
// ...

module.exports = router;