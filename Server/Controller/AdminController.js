const AdminModels = require('../Models/AdminModel')


const AdminConreoller = async (req, res) => {
    const { name, password, remember } = req.body;
    const newAdmin = new AdminModels({ name, password});
    await newAdmin.save();
    if (newAdmin) {
        res.status(200).json({ msg: 'Successfully Registration' });
    } else {
        res.status(400).json({ msg: 'Registration Error' });
    };
};

const AdminLoginConreoller = async (req, res) => {
    const { name, password } = req.body;

    const AdminExist = await AdminModels.findOne({ name });
    if (AdminExist && (await AdminExist.matchPassword(password))) {
        res.status(200).json({ msg: 'Successfully Login'});
    } else {
        res.status(400).json({ msg: "Invalid Email or Password" });
    }
};

module.exports = { AdminConreoller,AdminLoginConreoller }