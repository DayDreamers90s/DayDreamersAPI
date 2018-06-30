var Role = require('./roleModel');
var _ = require('lodash');
 
exports.params = function(req, res, next, id) {
    Role.findById(id)
    .then(function(role) {
      if (!role) {
        next(new Error('No roles found'));
      } else {
        req.role = role;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
    Role.find({})
    .then(function(roles){
      res.json(roles);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var role = req.role;
  res.json(role);
};

exports.put = function(req, res, next) {
  var role = req.role;

  var update = req.body;

  _.merge(role, update);

  role.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newRole = new Role(req.body);

  newRole.save(function(err, role) {
    if(err) {next(err);}
    res.json(role);
  });
};

exports.delete = function(req, res, next) {
  req.role.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};