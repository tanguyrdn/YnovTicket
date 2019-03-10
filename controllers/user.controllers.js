
// CREATE ----------------------------------------------------------------------------

// USER
exports.user_create = function (req, res) {
    let user = new user(
        {
            id : req.body.id,
            userType : req.body.userType,
            admin : req.body.admin,
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            department : req.body.department,
            company : req.body.company,
            endContract : req.body.endContract
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};

// READ ----------------------------------------------------------------------------

const User = require('../models/models.js');

// Find a single user with an id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
   .then(user => {
       if(!user) {
           return res.status(404).send({
               message: "user not found with id " + req.params.id
           });
       }
       res.send(user);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "user not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Error retrieving user with id " + req.params.id
       });
   });
};

// UPDATE ----------------------------------------------------------------------------

// User Update
exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};
