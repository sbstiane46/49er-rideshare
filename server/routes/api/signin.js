const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

    /*
     * Signup
     */

    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            studentID,
            password
        } = body;

        let {
            email
        } = body;

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        }
        if (!studentID) {
            return res.send({
                success: false,
                message: 'Error: Student ID cannot be blank.'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        console.log('Here');

        email = email.toLowerCase();

        //Verify if user already exists
        User.find({
            email: email,

        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists.'
                });
            }
        });

        //Save User
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.studentID = studentID;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            } 
            return res.send({
                success: true,
                message: 'Signed up!'
            });
        }) 
    });

    /*
     * Sign in
     */

    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const {
            password
        } = body;

        let {
            email
        } = body;

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
    
        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                console.log('err 2:', err);
                return res.send({
                    success: false,
                    message: "Error: Server error."
                });
            }
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: Invalid."
                });
            }

            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: "Error: Password Invalid."
                });
            }

            //Otherwise correct user
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        success: false,
                        message: "Error: Server error."
                    });
                }

                return res.send({
                    success: true,
                    message: "Valid Sign in",
                    token: doc._id
                });
            });

        });
    });

     /*
     * Verify
     */

    app.get('/api/account/verify', (req, res, next) => {
        //Get the token
        const { query } = req;
        const { token } = query;
        //Verify that the token is one of a kind and account is not deleted

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            }
            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid.'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Session verified.'
                });
            }
        });
    });

    /*
     * Logout
     */

    app.get('/api/account/logout', (req, res, next) => {
        //Get the token
        const { query } = req;
        const { token } = query;
        //Verify that the token is one of a kind and account is not deleted

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set:{isDeleted:true}
        }, null, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            }
             return res.send({
                success: true,
                message: 'Logged Out.'
            });
            
        });
    });
};
