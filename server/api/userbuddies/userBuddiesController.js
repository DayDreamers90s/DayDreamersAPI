var UserBuddies = require('./userBuddiesModel');
var _ = require('lodash');

exports.paramsforuser = function(req, res, next, userid) {
    UserBuddies.find({'user':userid})
      .then(function(userbuddies) {            
        if (userbuddies ==null || !userbuddies || userbuddies.length == 0) {
          next(new Error('No User buddies found for the user'));
        } else {
          req.userbuddies = userbuddies;
          next();
        }
      }, function(err) {
        next(err);
      });
  };


exports.getuserbuddies = function(req, res, next) {
    var userbuddies = req.userbuddies;
    res.json(userbuddies);
  };
  
  exports.deleteuserbuddies = function(req, res, next) {   
    var userbuddies = req.userbuddies;
    _.each(userbuddies,function(userbuddy){
      userbuddy.remove(function(err, removed) {
            if (err) {
              next(err);
            } else {
                //do nothing
            }
          });
    });   
    res.status(200).send('Deleted the user buddies');
  };

exports.params = function(req, res, next, id) {
  UserBuddies.findById(id)
    .then(function(userbuddy) {
      if (!userbuddy) {
        next(new Error('No User buddies found for the user'));
      } else {
        req.userbuddy = userbuddy;
        next();
      }
    }, function(err) {
      next(err);
    });
};


exports.getOne = function(req, res, next) {
  var userbuddy = req.userbuddy;
  res.json(userbuddy);
};

exports.put = function(req, res, next) {
  var userbuddy = req.userbuddy;

  var update = req.body;

  _.merge(userbuddy, update);

  userbuddy.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newUserBuddy = new UserBuddies(req.body);

  newUserBuddy.save(function(err, userbuddy) {
    if(err) {next(err);}
    res.json(userbuddy);
  });
};

exports.delete = function(req, res, next) {
  req.userbuddy.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
