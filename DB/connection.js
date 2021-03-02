mongoose.connect('mongodb+srv://adamoc:gaelicfootball@aoccovidbookings.4c5rb.mongodb.net/AOCCovidBookings?retryWrites=true&w=majority', {
// mongoose.connect('mongodb+srv://adamoc:gaelicfootball@covid-appointments.7zfr6.mongodb.net/covid-appointments?retryWrites=true&w=majority', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected successfully")
}).catch((err)=>{
    console.log(err)
})

module.exports = mongoose