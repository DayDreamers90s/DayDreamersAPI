var CardCategories = require('./cardCategoryModel');
var _ = require('lodash');
 
exports.params = function(req, res, next, id) {
    CardCategories.findById(id)
    .then(function(category) {
      if (!category) {
        next(new Error('No category found'));
      } else {
        req.category = category;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
    CardCategories.find({})
    .then(function(categories){
      res.json(categories);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var category = req.category;
  res.json(category);
};

exports.put = function(req, res, next) {
  var category = req.category;

  var update = req.body;

  _.merge(category, update);

  category.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newcategory= new CardCategories(req.body);

  newcategory.save(function(err, category) {
    if(err) {next(err);}
    res.json(category);
  });
};

exports.delete = function(req, res, next) {
  req.category.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};