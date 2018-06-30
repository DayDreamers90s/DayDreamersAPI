var DreamLikes = require('./dreamlikesModel');
var _ = require('lodash');

exports.paramsfordaydream = function(req, res, next, daydreamid) {
  DreamLikes.find({'daydream':daydreamid})
    .then(function(likes) {
      if (likes == null || !likes || likes.length == 0) {
        next(new Error('No likes found'));
      } else {
        req.likes = likes;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.getForDayDream = function(req, res, next) {
    var likes = req.likes;
    res.json(likes);
};

exports.deleteForDayDream = function(req, res, next) {
    var likes = req.likes;
    _.each(likes,function(dreamlike){
        DreamLikes.findByIdAndRemove(dreamlike._id,  function(err, removed) {
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
  DreamLikes.find({'user':userid})
    .then(function(likes) {
      if (likes == null || !likes || likes.length == 0) {
        next(new Error('No likes by the user'));
      } else {
        req.likes = likes;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.getForUser = function(req, res, next) {
    var likes = req.likes;
    res.json(likes);
};

exports.deleteForUser = function(req, res, next) {
    var likes = req.likes;
    _.each(likes,function(dreamlike){
        DreamLikes.findByIdAndRemove(dreamlike._id,  function(err, removed) {
            if (err) {
              next(err);
            } else {
                // do nothing
            }
          });
    });   
    res.status(200).send('Deleted the likes for the user');
};


exports.getForDayDreamByUser = function(req, res, next) {
    var daydreamid = req.daydreamid;
    var userid = req.userid;
    DreamLikes.find({'daydream':daydreamid, 'user':userid})
    .then(function(likes) {
      if (likes == null || !likes || likes.length ==0) {
        next(new Error('No like found for the daydream by the user'));
      }else if(likes.length >1){
        next(new Error('More than one like found for the daydream by the user'));
      } else {
        var dreamlike = likes[0];
        res.json(dreamlike);
      }
    }, function(err) {
      next(err);
    });
};

exports.deleteForDayDreamByUser = function(req, res, next) {
    var daydreamid = req.daydreamid;
    var userid = req.userid;
    DreamLikes.find({'daydream':daydreamid, 'user':userid})
    .then(function(likes) {
      if (likes == null || !likes || likes.length ==0) {
        next(new Error('No like found for the daydream by the user'));
      }else if(likes.length >1){
        next(new Error('More than one like found for the daydream by the user'));
      } else {
        var dreamlike = likes[0];
        DreamLikes.findByIdAndRemove(dreamlike._id,  function(err, removed) {
            if (err) {
              next(err);
            } else {
                res.json(removed);
            }
          });
      }
    }, function(err) {
      next(err);
    });
};

exports.post = function(req, res, next) {
  var newLike = new DreamLikes(req.body);

  newLike.save(function(err, like) {
    if(err) {next(err);}
    res.json(like);
  });
};