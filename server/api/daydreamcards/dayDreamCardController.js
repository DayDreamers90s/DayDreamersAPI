var DreamCards = require('./dayDreamCardModel');
var _ = require('lodash');

exports.paramsforcategory = function(req, res, next, categoryid) {
    DreamCards.find({'cardcategory':categoryid})
      .then(function(dreamcards) {            
        if (dreamcards ==null || !dreamcards || dreamcards.length == 0) {
          next(new Error('No Day dream cards found under this category'));
        } else {
          req.dreamcards = dreamcards;
          next();
        }
      }, function(err) {
        next(err);
      });
  };


exports.getdreamcardsforcategory = function(req, res, next) {
    var dreamcards = req.dreamcards;
    res.json(dreamcards);
  };
  
  exports.deletedreamcardsforcategory = function(req, res, next) {   
    var dreamcards = req.dreamcards;
    _.each(dreamcards,function(card){
        card.remove(function(err, removed) {
            if (err) {
              next(err);
            } else {
                //do nothing
            }
          });
    });   
    res.status(200).send('Deleted the day dream cards under the category');
  };

exports.params = function(req, res, next, id) {
  DreamCards.findById(id)
    .then(function(dreamcard) {
      if (!dreamcard) {
        next(new Error('No Day dream card found'));
      } else {
        req.dreamcard = dreamcard;
        next();
      }
    }, function(err) {
      next(err);
    });
};


exports.getOne = function(req, res, next) {
  var dreamcard = req.dreamcard;
  res.json(dreamcard);
};

exports.put = function(req, res, next) {
  var dreamcard = req.dreamcard;

  var update = req.body;

  _.merge(dreamcard, update);

  dreamcard.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};


exports.delete = function(req, res, next) {
  req.dreamcard.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};


exports.get = function(req, res, next) {
    DreamCards.find({})
    .then(function(cards){
      res.json(cards);
    }, function(err){
      next(err);
    });
  };
  


exports.post = function(req, res, next) {
    var newDreamCard = new DreamCards(req.body);
  
    newDreamCard.save(function(err, savedcard) {
      if(err) {next(err);}
      res.json(savedcard);
    });
  };
