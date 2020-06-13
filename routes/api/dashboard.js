const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Session = require('../../models/Session');
const Admin = require('../../models/Admin');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    Session.find({ user: req.user.id }, (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }
      console.log(doc);
      res.status(200).json(doc[0].roomid);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/availablity', auth, async (req, res) => {
  try {
    Admin.find({ _id: '5ed915f5282570ce2c943e44' }, (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }
      console.log(doc);
      const session = doc[0].availablity;
      console.log('d', session);

      res.status(200).json(session);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
