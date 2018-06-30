var router = require('express').Router();
var controller = require('./userController');

var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});


// lock down the right routes :)
router.param('id', controller.params);

router.route('/')
  .get(requireAuth,controller.get)
  .post(controller.post)

router.route('/:id')
  .get(requireAuth, controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;