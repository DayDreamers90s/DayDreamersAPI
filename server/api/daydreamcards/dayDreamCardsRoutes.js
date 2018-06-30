var router = require('express').Router();
var controller = require('./dayDreamCardController');


router.param('categoryid', controller.paramsforcategory); 

router.route('/forcategory/:categoryid')
  .get(controller.getdreamcardsforcategory)
  .delete(controller.deletedreamcardsforcategory) 


router.param('id', controller.params);  

router.route('/')
.get(controller.get)
.post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;