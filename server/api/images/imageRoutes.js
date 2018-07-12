var router = require('express').Router();
var controller = require('./imageController');
var UPLOAD_PATH = 'uploads';
var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      console.log('destination: '+ destination);
      cb(null, UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
      console.log('filename: ' +  file.fieldname + '-' + Date.now());
      cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })

router.param('id', controller.params);  

router.route('/')
.get(controller.get)
.post(upload.single('image'), controller.post)

router.route('/:id')
  .get(controller.getOne)
//   .put(controller.put)
  .delete(controller.delete)

module.exports = router;