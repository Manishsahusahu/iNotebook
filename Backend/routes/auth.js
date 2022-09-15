const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser');

const JWT_SECERT = 'IamDonManish$yesDonManish';

// Route:1 create a user using: post "/api/auth/createuser". no login required
router.post('/createuser', [
   body('name', 'Name length should be geater than 2 characters').isLength({ min: 3 }),
   body('email', 'Enter a valid email address').isEmail(),
   body('password', 'Password length must be greater than 4 characters').isLength({ min: 5 }),
], async (req, res) => {
   // if there are errors then return Bad request with the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   // checking whether user with same email exist or not
   try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ error: "sorry same email address exists already" })
      }
      // create a user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
         name: req.body.name,
         password: secPass,
         email: req.body.email,
      })
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:"Please enter a unique value"})})
      const data = {
         user: {
            id: user.id,
         }
      }
      const authtoken = jwt.sign(data, JWT_SECERT);
      res.json({ authtoken });
      // res.json(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
})

// Route:2 create a user using: post "/api/auth/login". no login required
router.post('/login', [
   body('email', 'Enter a valid email address').isEmail(),
   body('password', 'Password could not be blank').exists(),
], async (req, res) => {
   // if there are errors then return Bad request with the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const { email, password } = req.body;
   try {
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: "Not matched! try again" })
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         return res.status(400).json({ error: "Not matched! try again" })
      }

      const data = {
         user: {
            id: user.id,
         }
      }
      const authtoken = jwt.sign(data, JWT_SECERT);
      res.json({ authtoken });

   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
});

// Route:3 get loggedin user details using: post "/api/auth/getuser". no login required
router.post('/getuser',fetchuser, async (req, res) => {
   try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
});
module.exports = router; 