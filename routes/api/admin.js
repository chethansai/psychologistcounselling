const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Admin = require('../../models/Admin');
const Sessions = require('../../models/Session');
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/',

  async (req, res) => {
    Admin.find({ _id: '5ed915f5282570ce2c943e44' }, (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }
      console.log(doc);
      const session = doc[0].sessions;
      res.status(200).json(session);
    });
  }
);

router.delete(
  '/deletesession/:_id/:user',

  async (req, res) => {
    try {
      const admin = await Admin.findById({ _id: '5ed915f5282570ce2c943e44' });
      const session = admin.sessions.find(
        (session) => session.id === req.params._id
      );

      admin.sessions = admin.sessions.filter(({ id }) => id !== req.params._id);

      await admin.save();
      Sessions.findOneAndUpdate(
        { user: req.params.user },
        { $set: { roomid: 'null' } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log('Something wrong when updating data!');
          }

          console.log(doc);
        }
      );
      res.json({ msg: 'session removed' });
      return res.json(admin.sessions);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
