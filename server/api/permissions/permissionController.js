var Permissions = require('./permissionModel');
var _ = require('lodash');

exports.paramsforpage = function(req, res, next, pagename) {
    req.page = pagename;
    Permissions.find({'page':pagename})
    .then(function(perms) {
      if (perms == null || !perms || perms.length == 0) {
        next(new Error('No permissions found'));
      } else {
        req.perms = perms;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.getForPage = function(req, res, next) {
    var perms = req.perms;
    res.json(perms);
};

exports.deleteForPage = function(req, res, next) {
    var perms = req.perms;
    _.each(perms,function(perm){
        Permissions.findByIdAndRemove(perm._id,  function(err, removed) {
            if (err) {
              next(err);
            } else {
                // do nothing
            }
          });
    });   
    res.status(200).send('Deleted the permissions for the page: '+ req.page);
};
 
exports.params = function(req, res, next, id) {
    Permissions.findById(id)
    .then(function(perm) {
      if (!perm) {
        next(new Error('No permissions found'));
      } else {
        req.perm = perm;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
    Permissions.find({})
    .then(function(perms){
      res.json(perms);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var perm = req.perm;
  res.json(perm);
};

exports.put = function(req, res, next) {
  var perm = req.perm;

  var update = req.body;

  _.merge(perm, update);

  perm.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newPerm = new Permissions(req.body);

  newPerm.save(function(err, perm) {
    if(err) {next(err);}
    res.json(perm);
  });
};

exports.delete = function(req, res, next) {
  req.perm.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};