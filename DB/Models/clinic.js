const mongoose = require('../connection'),
clinicSchema = new mongoose.Schema({
    Month: String,
    Dates: [String],
    Timeslots: [
        {
            "Hours": [String],
            "Providers": String
        }
    ]
}),
clinic = mongoose.model("Clinic", clinicSchema)
module.exports = clinic
