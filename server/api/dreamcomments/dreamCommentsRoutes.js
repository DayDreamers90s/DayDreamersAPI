var router = require('express').Router();
var controller = require('./dreamcommentsController');

router.param('daydreamid',controller.paramsfordaydream);

router.route('/fordaydream/:daydreamid')
.get(controller.getForDayDream)
.delete(controller.deleteForDayDream)


router.param('userid',controller.paramsforuser);

router.route('/foruser/:userid')
.get(controller.getForUser)
.delete(controller.deleteForUser)


router.route('/fordaydreambyuser/:daydreamid/:userid')
.get(controller.getForDayDreamByUser)
.delete(controller.deleteForDayDreamByUser)

router.param('id',controller.params);
router.route('/:id')
.get(controller.getOne)
.put(controller.putOne)
.delete(controller.deleteOne)

router.route('/')
.post(controller.post)


module.exports = router;