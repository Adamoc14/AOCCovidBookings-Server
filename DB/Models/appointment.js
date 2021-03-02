const mongoose = require('../connection')
appointmentSchema = new mongoose.Schema({
    Month: String, 
    DayName: String, 
    DayDate: String, 
    Time: String,
    Capacity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})
appointment = mongoose.model("Appointment", appointmentSchema)
module.exports = appointment