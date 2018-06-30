var UserDetails = require('./userDetailsModel');
var _ = require('lodash');

exports.paramsforuser = function(req, res, next, userid) {
    UserDetails.find({'user':userid})
      .then(function(userdetails) {  
        if(userdetails !=null && userdetails.length > 1){
            next(new Error('Multiple User details found with that id'));
        }     
        if (!userdetails) {
          next(new Error('No User details with that id'));
        } else {
            console.log(userdetails);
          req.userdetails = userdetails[0];
          next();
        }
      }, function(err) {
        next(err);
      });
  };


exports.getOneForUser = function(req, res, next) {
    var userdetails = req.userdetails;
    res.json(userdetails);
  };

 
  exports.putForUser = function(req, res, next) {
    var userdetails = req.userdetails;
  
    var update = req.body;
  
    _.merge(userdetails, update);
  
    userdetails.save(function(err, saved) {
      if (err) {
        next(err);
      } else {
        res.json(saved);
      }
    })
  };
  
   exports.deleteForUser = function(req, res, next) {   
    UserDetails.findByIdAndRemove(req.userdetails._id,  function(err, removed) {
      if (err) {
        next(err);
      } else {
        res.json(removed);
      }
    });
  };

exports.params = function(req, res, next, id) {
  UserDetails.findById(id)
    .then(function(userdetails) {
      if (!userdetails) {
        next(new Error('No userdetails with that id'));
      } else {
        req.userdetails = userdetails;
        next();
      }
    }, function(err) {
      next(err);
    });
};


exports.getOne = function(req, res, next) {
  var userdetails = req.userdetails;
  res.json(userdetails);
};

exports.put = function(req, res, next) {
  var userdetails = req.userdetails;

  var update = req.body;

  _.merge(userdetails, update);

  userdetails.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newUserDetails = new UserDetails(req.body);

  newUserDetails.save(function(err, userDetails) {
    if(err) {next(err);}
    res.json(userDetails);
  });
};

exports.delete = function(req, res, next) {
  req.userdetails.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
