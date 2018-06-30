



// exports.verifyUser = function() {
//     return function(req, res, next) {
//         var email = req.body.email;
//         var password = req.body.password;

//     // if no username or password then send
//     if (!email || !password) {
//       res.status(400).send('You need an email and password');
//       return;
//     }
//     // look user up in the DB so we can check
//     // if the passwords match for the username
//     User.findOne({email: email})
//       .then(function(user) {
//         if (!user) {
//           res.status(401).send('No user with the given email');
//         } else {
//           // checking the passowords here
//           if (!user.authenticate(password)) {
//             res.status(401).send('Wrong password');
//           } else {
//             // if everything is good,
//             // then attach to req.user
//             // and call next so the controller
//             // can sign a token from the req.user._id
//             req.user = user;
//             next();
//           }
//         }
//       }, function(err) {
//         next(err);
//       });
//     }
// }

// exports.checkUserName = function() {
//     User.findOne({email: email}, function(err,doc){
//         if(err){res.status(400).send('You need a valid email')}
//         else{
//             if(doc){
//                 res.status(401).send('Email already exists')
//             }else{
//                 var record = new User()
//                 record.username = username;
//                 record.password = record.hashPassword(password);
//                 record.save(function(err,user){
//                         if(err){
//                             res.status(500).send('DB error')
//                         }else{
//                             res.send(user)
//                         }
//                 });
//             }
//         }
//     });
// }

