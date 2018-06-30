var router = require('express').Router();
var controller = require('./permissionController');

router.param('pagename',controller.paramsforpage);

router.route('/forpage/:pagename')
.get(controller.getForPage)
.delete(controller.deleteForPage)

router.param('id', controller.params);  

router.route('/')
.get(controller.get)
.post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;