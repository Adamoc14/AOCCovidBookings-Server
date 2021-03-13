const express = require('../Helpers_and_Prerequisites/libs_required').express,
    router = express.Router(),
    clinic = require('../DB/Models/clinic')

// Router is mounted at /api/v1/clinics , all routes after this will be prefixed with this

router.get("/", async(req, res) => {
    const clinics = await clinic.find()
    res.send(clinics)
})

router.post("/", async(req, res) => {
    const { Month , Dates , Timeslots } = req.body,
    clinicData = { Month , Dates , Timeslots }
    clinicCreated = await clinic.create(clinicData)
    res.send(clinicCreated)
})

router.put("/:id" , async(req, res) => {
    const {id} = req.params,
        { Month, Dates, Timeslots} = req.body
    newClinic = { Month, Dates, Timeslots }
    await clinic.findByIdAndUpdate(id , newClinic , (err , updatedClinic) => {
        if(err) console.log(err)
        res.send(updatedClinic)
    })
})

router.get("/:id", async(req,res) => {
    const {id} = req.params,
    singleSlot = await clinic.findById(id)
    res.send(singleSlot) 
})

router.delete("/:id" , async(req, res) => {
    const {id} = req.params
    await clinic.findByIdAndRemove(id)
    res.send(200)
})

module.exports = router