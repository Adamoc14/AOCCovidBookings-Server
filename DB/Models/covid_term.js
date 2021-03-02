const mongoose = require('../connection'),
covidTermSchema = new mongoose.Schema({
    Min_Age: String,
    Date: String,
    Month: String
}),
covid_term = mongoose.model("Covid_Terms", covidTermSchema)
module.exports = covid_term