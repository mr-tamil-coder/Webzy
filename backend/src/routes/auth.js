const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/verifyAuth");
const router = express.Router();

// Google auth register
router.post("/google", async (req, res) => {
  try {
    const {
      email,
      email_verified,
      family_name,
      given_name,
      name,
      picture,
      sub,
    } = req.body;

    // Check if user exists
    let user = await User.findOne({ googleId: sub });

    // Create new user if doesn't exist
    if (!user) {
      user = new User({
        googleId: sub,
        email,
        emailVerified: email_verified,
        firstName: given_name,
        lastName: family_name,
        fullName: name,
        profilePicture: picture,
      });
      await user.save();
    } else {
      // Update existing user's profile picture if changed
      if (user.profilePicture !== picture) {
        user.profilePicture = picture;
        await user.save();
      }
    }
    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.fullName,
        picture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

router.post("/vinoth", userAuth, async (req, res) => {
  try {
    // console.log(req.user);

    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;
