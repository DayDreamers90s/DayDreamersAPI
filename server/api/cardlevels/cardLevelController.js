var CardLevels = require('./cardLevelModel');
var _ = require('lodash');
 
exports.params = function(req, res, next, id) {
    CardLevels.findById(id)
    .then(function(level) {
      if (!level) {
        next(new Error('No levels found'));
      } else {
        req.level = level;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
    CardLevels.find({})
    .then(function(levels){
      res.json(levels);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var level = req.level;
  res.json(level);
};

exports.put = function(req, res, next) {
  var level = req.level;

  var update = req.body;

  _.merge(level, update);

  level.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newlevel = new CardLevels(req.body);

  newlevel.save(function(err, level) {
    if(err) {next(err);}
    res.json(level);
  });
};

exports.delete = function(req, res, next) {
  req.level.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};