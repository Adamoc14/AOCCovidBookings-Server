// App variable and function Definitions
const express = require('./Helpers_and_Prerequisites/libs_required').express,
    app = express(),
    port = process.env.PORT || 8000;
    appointment = require('./api/appointments')
    clinic = require('./api/clinics')
    covid_term = require('./api/covid_terms')
    user = require('./api/users')


// App Configurations
require('dotenv').config()
app.use(bodyParser.json())
// app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())


//Routes
app.get("/", (req, res)=> {
    res.json({
        message: "Well boi, you're flying it bud",
    })
})
app.use("/api/v1/appointments", appointment)
app.use("/api/v1/clinics", clinic)
app.use("/api/v1/covid_terms", covid_term)
app.use("/api/v1/users", user)


// Error Handling 
// app.use((err  , req , res , next) => {
//     res.status(err.status || 500)
//     res.json({
//         message: err.message,
//         error: err.stack || {}
//     })
// })

// app.use((req,res,next) => {
//     const err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })


// Listen to port
app.listen(port , () => {
    console.log(`Your server seems to have started on port ${port}, fair play chief`)
})