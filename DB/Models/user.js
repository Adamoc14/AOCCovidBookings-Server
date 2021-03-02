const mongoose = require('../connection')
userSchema = new mongoose.Schema({
    firstName: String,
    Surname: String,
    Gender: String,
    Mothers_Maiden_Name: String,
    Street_Address: String,
    City_Address: String,
    County: String,
    Mobile: String,
    Alternate_Number:String,
    Email: String,
    DOB: String,
    Medical_Card: Boolean,
    PPS_Number: String,
    Car_Reg: String,
    Bleeding_Disorder_Or_Anticoagulation: String,
    Surgery: Boolean,
    Appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    }]
})
user = mongoose.model("User", userSchema)
module.exports = user