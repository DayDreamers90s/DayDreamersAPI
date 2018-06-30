var router = require('express').Router();
var controller = require('./userBuddiesController');


router.param('userid', controller.paramsforuser); 

router.route('/foruser/:userid')
  .get(controller.getuserbuddies)
  .delete(controller.deleteuserbuddies) 


router.param('id', controller.params);  

router.route('/')
.post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;