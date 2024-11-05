const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Email non valide"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (v) => validator.isLength(v, { min: 8 }),
            message: "Password must be at least 8 characters long"
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();

    delete user.password;
    delete user.authTokens;
    delete user.__v;

    return user;
}

userSchema.methods.generatJWT = async function () {
    const expiresIn = '2h';
    const authToken = jwt.sign({ _id: this._id.toString() }, 'foo', { expiresIn });
    this.authTokens.push({ authToken });
    await this.save();
    return authToken;
}

userSchema.statics.findUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Erreur, pas de connexion possible!');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Erreur, pas de connexion possible!');
    return user;
}


userSchema.pre('save', async function () {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model('User', userSchema);


module.exports = User; 