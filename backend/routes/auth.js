const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const router = express.Router();
var jwt = require("jsonwebtoken");
const JWT_SECRET = "faseehhayat123";
var fetchuser = require('../middleware/fetchuser');

//Route: 1  Creating A user No login required
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 3 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry this user already exist" });
      }
      const salt = await bcrypt.genSalt(10);

      secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      //   res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "some eroor occured" });
    }
  }
);

//Route: 2 login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there was an error send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "try login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "try login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server error occured" });
    }
  }
);

//Route:3 updating User Password

router.put(
  "/updatepassword",
  fetchuser,
  [
    body("oldPassword").isLength({ min: 3 }),
    body("newPassword").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      userId = req.user.id;
      const user = await User.findById(userId);
      const passwordCompare = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid old password" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.newPassword, salt);
      user.password = secPass;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server error occured" });
    }
  }
);



//Route: 4 getting all login detail
router.post(
  "/getuser", fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server error occured" });
    }
  }
);

module.exports = router;
