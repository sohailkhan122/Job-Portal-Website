const CreateJobModel = require('../Models/CreateJobModel')

const CreateJobController = async (req, res) => {
    const { jobtittle, company, workplacetype, joblocation, jobtype, aboutInfo, createdBy,disabled } = req.body;
    const newCreateJob = await new CreateJobModel({ jobtittle, company, workplacetype, joblocation, jobtype, aboutInfo, createdBy ,disabled});
    await newCreateJob.save();
    if (newCreateJob) {
        res.status(200).json(newCreateJob);
    } else {
        res.status(400).json({ msg: 'Registration Error' });
    };
};

const fatchAllJobs = async (req, res) => {
    const fatchall = await CreateJobModel.find()
    if (fatchall) {
        res.status(200).json(fatchall)
    }


}

const singleJob = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const job = await CreateJobModel.findOne({ _id: `${id}` }).exec();

        if (job) {
            res.status(200).json(job);
            console.log(job);
        } else {
            res.status(404).json({ msg: 'Job not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const singledelete = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        await CreateJobModel.deleteOne({ _id: id }).exec();
        res.status(200).json({ msg: 'deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const newData = req.body;

    try {
        const updatedJob = await CreateJobModel.findByIdAndUpdate(jobId, newData, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const disabled = async (req, res) => {
    const  id  = req.params.id;
    const disabled = req.body
    console.log(disabled)

    try {
        const finddisabled = await CreateJobModel.findByIdAndUpdate(id ,disabled);
        if (finddisabled) {
            res.status(200).json(finddisabled);
        } else {
            res.status(400).json({ msg: 'Does not exist' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = { CreateJobController, fatchAllJobs, singleJob, singledelete, updateJob, disabled }