const express = require('../Helpers_and_Prerequisites/libs_required').express,
    router = express.Router(),
    //transporter = require('../Helpers_and_Prerequisites/libs_required').transporter,
    user = require('../DB/Models/user');

// Router is mounted at /api/v1/users , all routes after this will be prefixed with this


// ____Create____ - Covered in Making an appointment 

// _____Read_All____ 
router.get("/" , async(req,res) => {
    user.find({})
        .populate("Appointments")
        .exec((err, users) => {
            if (err) console.log(err)
            res.send(users);
        });
})

// ___Read_User_By_Id_____
router.get("/:id", async(req, res, next) => {
    try {

        const userFound = await user.findById(req.params.id).populate("Appointments").exec()
        if(!userFound) return next()
        return res.send(userFound)
    } catch (error) {
        next(error)
    }
})

// ___Read_Users_By_Ids___
router.get("/details/:ids", async (req, res, next) => {
    try {
        req.params.ids = req.params.ids.split(",")
        const users = await user.find().where('_id').in(req.params.ids).populate("Appointments").exec()
        if (!users) return next()
        if(users.length === 0) return
        res.send(users)
    } catch (error) {
        next(error)
    }
})





module.exports = router