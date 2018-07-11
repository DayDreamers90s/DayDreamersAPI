var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./users/userRoutes'));
router.use('/userdetails', require('./userdetails/userDetailRoutes'));
router.use('/userbuddies', require('./userbuddies/userBuddiesRoutes'));
router.use('/roles', require('./roles/rolesRoutes'));
router.use('/permissions', require('./permissions/permissionRoutes'));
router.use('/dreamlikes', require('./dreamlikes/dreamLikesRoutes'));
router.use('/dreamcomments', require('./dreamcomments/dreamCommentsRoutes'));
router.use('/daydreamcards', require('./daydreamcards/dayDreamCardsRoutes'));
router.use('/cardcategories', require('./cardcategories/cardCategoriesRoutes'));
router.use('/cardlevels', require('./cardlevels/cardLevelRoutes'));
router.use('/captureddreams', require('./captureddreams/capturedDreamsRoutes'));
router.use('/images', require('./images/imageRoutes'));

module.exports = router;