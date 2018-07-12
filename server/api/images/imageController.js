var Image = require('./imageModel');
var _ = require('lodash');
var UPLOAD_PATH = 'uploads';

exports.params = function(req, res, next, id) {
    Image.findById(id)
    .then(function(image) {
      if (!image) {
        next(new Error('No image found'));
      } else {
        req.image = image;
        next();
      }
    }, function(err) {
      next(err);
    });
};


exports.getOne = function(req, res, next) {
  var image = req.image;
  res.setHeader('Content-Type', 'image/jpeg');
  fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
};

// exports.put = function(req, res, next) {
//   var image = req.image;

//   var update = req.body;

//   _.merge(image, update);

//   image.save(function(err, saved) {
//     if (err) {
//       next(err);
//     } else {
//       res.json(saved);
//     }
//   })
// };


exports.delete = function(req, res, next) {
  req.image.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
        del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
            res.sendStatus(200);
        })
    }
  });
};


exports.get = function(req, res, next) {
    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
           next(err);
        }
 
        // Manually set the correct URL to each image
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }
        res.json(images);
    })
  };
  


exports.post = function(req, res, next) {
    console.log('********************');
    // console.log(JSON.stringify(req));
    var newImage = new ImageModel();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc

    newImage.save(function(err, savedimage) {
      if(err) {next(err);}
      res.status(201).send({ savedimage });
    });
  };
