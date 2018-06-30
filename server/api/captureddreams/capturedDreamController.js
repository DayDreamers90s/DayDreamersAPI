var CapturedDreams = require('./captureddreamModel');
var _ = require('lodash');
 
exports.params = function(req, res, next, id) {
    CapturedDreams.findById(id)
    .then(function(capture) {
      if (!capture) {
        next(new Error('No captured day dreams found'));
      } else {
        req.capture = capture;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
    CapturedDreams.find({})
    .then(function(captures){
      res.json(captures);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var capture = req.capture;
  res.json(capture);
};

exports.put = function(req, res, next) {
  var capture = req.capture;

  var update = req.body;

  _.merge(capture, update);

  capture.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newcapture = new CapturedDreams(req.body);

  newcapture.save(function(err, updated) {
    if(err) {next(err);}
    res.json(updated);
  });
};

exports.delete = function(req, res, next) {
  req.capture.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};