const User = require('../models/user');

exports.registerUser = async (req, res, next) => {
    const user = new User(req.body);
    try {
        const authToken = await user.generatJWT();
        res.status(201).send({user, authToken} );
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findUser(req.body.email, req.body.password);
        const authToken = await user.generatJWT();
        res.json({user, authToken});
    } catch (e) {
        res.status(400).send('create un acounte please!');
    }
};

exports.logout = async (req, res, next) => {
    try {
        req.user.authTokens = req.user.authTokens.filter((authToken) => {
            return authToken.authToken !== req.authToken;
        });

        await req.user.save();
        res.send("Logout");
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.logoutAll = async (req, res, next) => {
    try {
        req.user.authTokens = [];
        await req.user.save();
        res.send("LogoutAll");
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const users = await User.find({});
            res.send(users);
        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getUserConnected = async (req, res, next) => {
    res.send(req.user);
};

exports.getUserById = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (req.user.isAdmin || req.user._id.toString() === userId) {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send('User not found!');
            }

            res.send(user);
        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.putUserConnected = async (req, res, next) => {
    const updatedInfo = Object.keys(req.body);
    try {
        updatedInfo.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.send(e);
    }
};

exports.putUserById = async (req, res, next) => {
    const updatedInfo = Object.keys(req.body);
    const userId = req.params.id;

    try {
        if (req.user.isAdmin || req.user._id.toString() === userId) {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send('User not found!');
            }

            updatedInfo.forEach(update => user[update] = req.body[update]);
            await user.save();

            res.send(user);
        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.deleteUserConnected = async (req, res, next) => {
    try {
        await req.user.deleteOne();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.deleteUserById = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (req.user.isAdmin || req.user._id.toString() === userId) {

            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                return res.status(404).send('User not found!');
            }
            res.send(user);
        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};