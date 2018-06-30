var DreamComments = require('./dreamcommentsModel');
var _ = require('lodash');

exports.paramsfordaydream = function(req, res, next, daydreamid) {
    DreamComments.find({'daydream':daydreamid})
    .then(function(comments) {
      if (comments == null || !comments || comments.length == 0) {
        next(new Error('No comments found'));
      } else {
        req.comments = comments;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.getForDayDream = function(req, res, next) {
    var comments = req.comments;
    res.json(comments);
};

exports.deleteForDayDream = function(req, res, next) {
    var comments = req.comments;
    _.each(comments,function(comment){
        DreamComments.findByIdAndRemove(comment._id,  function(err, removed) {
            if (err) {
              next(err);
            } else {
                // do nothing
            }
          });
    });   
    res.status(200).send('Deleted the likes for the daydream');
};

exports.paramsforuser = function(req, res, next, userid) {
    DreamComments.find({'user':userid})
    .then(function(comments) {
      if (comments == null || !comments || comments.length == 0) {
        next(new Error('No comments made by the user'));
      } else {
        req.comments = comments;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.getForUser = function(req, res, next) {
    var comments = req.comments;
    res.json(comments);
};

exports.deleteForUser = function(req, res, next) {
    var comments = req.comments;
    _.each(comments,function(comment){
        DreamComments.findByIdAndRemove(comment._id,  function(err, removed) {
            if (err) {
              next(err);
            } else {
                // do nothing
            }
          });
    });   
    res.status(200).send('Deleted the comments made by the user');
};


exports.getForDayDreamByUser = function(req, res, next) {
    var daydreamid = req.daydreamid;
    var userid = req.userid;
    DreamComments.find({'daydream':daydreamid, 'user':userid})
    .then(function(comments) {
      if (comments == null || !comments || comments.length ==0) {
        next(new Error('No comments found for the daydream made by the user'));
      } else {
        res.json(comments);
      }
    }, function(err) {
      next(err);
    });
};

exports.deleteForDayDreamByUser = function(req, res, next) {
    var daydreamid = req.daydreamid;
    var userid = req.userid;
    DreamComments.find({'daydream':daydreamid, 'user':userid})
    .then(function(comments) {
      if (comments == null || !comments || comments.length ==0) {
        next(new Error('No comments found for the daydream made by the user'));
      } else {
        var comments = req.comments;
        _.each(comments,function(comment){
            comment.remove(function(err, removed) {
            if (err) {
              next(err);
            } else {
                    // do nothing 
            }
          });
      });
      res.status(200).send('Deleted the comments made by the user for the daydream');
    }
    }, function(err) {
      next(err);
    });
};


exports.params = function(req, res, next, id) {
    DreamComments.findById(id)
    .then(function(comments) {
      if (!comment) {
        next(new Error('No comment found'));
      } else {
        req.comment = comment;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
    var comment = req.comment;
    res.json(comment);
  };

  exports.putOne = function(req, res, next) {
    var comment = req.comment;
  
    var update = req.body;
  
    _.merge(comment, update);
  
    comment.save(function(err, saved) {
      if (err) {
        next(err);
      } else {
        res.json(saved);
      }
    })
  };

  exports.deleteOne = function(req, res, next) {
    req.comment.remove(function(err, removed) {
      if (err) {
        next(err);
      } else {
        res.json(removed);
      }
    });
  };

  exports.post = function(req, res, next) {
    var newCOmment = new DreamComments(req.body);
  
    newCOmment.save(function(err, comment) {
      if(err) {next(err);}
      res.json(comment);
    });
  };