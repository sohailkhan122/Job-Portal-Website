const generateToken = require('../Config/generateToken');
const UserModels = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const UserConreoller = async (req, res) => {
    const { name, email, password, remember } = req.body;

    const userExist = await UserModels.findOne({ email });
    if (userExist) return res.status(400).json({ msg: 'User Already Exist' });

    const newUser = new UserModels({ name, email, password, remember });
    await newUser.save();
    if (newUser) {
        res.status(200).json({ msg: 'Successfully Registration' });
    } else {
        res.status(400).json({ msg: 'Registration Error' });
    };
};

const UserLoginConreoller = async (req, res) => {
    const { email, password } = req.body;

    const userExist = await UserModels.findOne({ email });
    if (userExist && (await userExist.matchPassword(password))) {
        const token = generateToken(userExist);
        res.status(200).json({ msg: 'Successfully Login', token: token });
    } else {
        res.status(400).json({ msg: "Invalid Email or Password" });
    }
};

const ForgetPassword = async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    const oldUser = await UserModels.findOne({ email });
    if (oldUser) {
        const secret = process.env.JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m', })
        const link = `http://localhost:8000/resetPassword/${oldUser._id}/${token}`;
        console.log(link)
    } else {
        return res.status(400).json({ msg: 'User Not Exists!!' });
    }
}

const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params)
    const oldUser = await UserModels.findOne({ _id: id });
    if (!oldUser) {
        return res.status(400).json({ meg: 'User Not Exists' })
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret)
        res.render('index', { email: verify.email })
    } catch (error) {
        res.send('not verifed')

    }
}

const resetsPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { ispassword, confirmPassword } = req.body;

        if (ispassword !== confirmPassword) {
            return res.status(400).json({ msg: 'Passwords do not match' });
        }

        const oldUser = await UserModels.findOne({ _id: id });

        if (!oldUser) {
            return res.status(400).json({ msg: 'User Not Exists' });
        }

        const secret = process.env.JWT_SECRET + oldUser.password;
        const verify = jwt.verify(token, secret);

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(ispassword, salt);

        await UserModels.updateOne(
            { _id: id },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );

        res.status(200).json({ msg: 'Password Updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong', error: error.message });
    }
};


module.exports = { UserConreoller, UserLoginConreoller, ForgetPassword, resetPassword, resetsPassword }