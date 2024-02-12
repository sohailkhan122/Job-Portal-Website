const ApplyUserModel = require('../Models/ApplyUserModel')

const applyForm = async (req, res) => {
    const { name, email, number, education, jobId,userId} = req.body;

    const AlreadyApply = await ApplyUserModel.findOne({ jobId,userId});
    if (AlreadyApply) return res.status(400).json({ msg: 'User Already Apply' });
    console.log(req.body)
    const applyUser = await new ApplyUserModel({ name, email, number, education, jobId,userId});
    await applyUser.save();
    if (applyUser) {
        res.status(200).json(applyUser);
    } else {
        res.status(400).json({ msg: 'Registration Error' });
    };
};


const fatchAllApply = async (req, res) => {
    const fatchall = await ApplyUserModel.find()
    if (fatchall) {
        res.status(200).json(fatchall)
    }


}

const singleApplydelete = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
      const deleted = await ApplyUserModel.deleteOne({ _id: id }).exec();
        res.status(200).json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
module.exports = {applyForm,fatchAllApply,singleApplydelete}