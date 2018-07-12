var router = require('express').Router();
var controller = require('./imageController');
var UPLOAD_PATH = 'uploads';
var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      console.log('destination: '+ UPLOAD_PATH);
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
// .post(upload.single('image'), controller.post)
router.post('/', upload.single('image'), (req, res, next) => {
    console.log('********************');
    console.log(JSON.stringify(req));
    // Create a new image model and fill the properties
    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    });
});

router.route('/:id')
  .get(controller.getOne)
//   .put(controller.put)
  .delete(controller.delete)

module.exports = router;