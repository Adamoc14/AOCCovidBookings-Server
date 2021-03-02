const helper_func = require('../Helpers_and_Prerequisites/helper_func'),
    appointment = require('./Models/appointment'),
    user = require('./Models/user');

module.exports = {
    getAll: (req , res , type) => {
        type = helper_func.getType(type)
        type.find({}, (err, allOfType)=> {
            if(err) console.log(err)
            res.json(allOfType)
        })
    },
    getUserWithAppointments: (req, res, type) => {
        // const user = req.body.user
        user.findOne({ Surname: "Warren" }).populate("Appointments").exec((err, appointments) => {
            if (err) console.log(err)
            res.json(appointments)
        })
    },
    createUserWithAppointment: async(req, res) => {
        // let user = req.body.user
    }
}