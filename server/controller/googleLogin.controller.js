var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require("../services/user.service.js");
var nodemailer = require('nodemailer');
var AuthenticationTokenModel = require("../schema/authenticationToken.model.js");
var Uttils = require("../utils/CommonUtils.js");


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'khushbooc@intelligrape.com',
        pass: '*ik onkar*'
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
});
router.get('/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/'
    }));
router.get('/success', function (req, res) {
    userService.findByEmail(req.user.email, function (err, user) {
        if (err) {
            res.json({status: false, message: "Some error occurred"});
            return
        }
        if (user) {
            res.cookie('user', JSON.stringify(user));
            res.redirect('http://localhost:9000/dashboard');
        } else {
            var payload = {
                email: req.user.email,
                name: req.user.displayName
            };
            var access_token = Uttils.generateToken();
            var authenticationToken = new AuthenticationTokenModel({
                tokenValue: access_token,
                tokenType: "GoogleLogin"
            });
            authenticationToken.save(function (err, token) {
                if (err) {
                    res.json({status: false, message: "Some error occurred"});
                    return
                }
                userService.addUser(payload, function (err, data) {
                    if (err) {
                        res.json({status: false, message: "Some error occurred"});
                        return
                    }
                    var mailOptions = {
                        from: '"TodoApp" <k' +
                        'kcfragrance.9@gmail.com>', // sender address
                        to: 'khushboo.chanana@tothenew.com', // list of receivers
                        subject: 'Hello ', // Subject line
                        text: 'Change Password', // plaintext body
                        html: '<a href="http://localhost:9000/resetPassword?token=' + token.tokenValue + '&email=' + data.email + '">click here</a>' // html body
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            res.json({status: false, message: "Some error occurred"});
                            return;
                        }
                        res.cookie('user', JSON.stringify(data));
                        res.redirect('http://localhost:9000/dashboard');
                    });
                })
            });
        }
    })
});

router.get('/fail', function (req, res) {
    console.log("fail")
});

module.exports = router;
