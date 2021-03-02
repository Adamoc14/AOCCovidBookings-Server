const express = require('../Helpers_and_Prerequisites/libs_required').express,
    router = express.Router(),
    sgMail = require('../Helpers_and_Prerequisites/libs_required').sgMail,
    appointment  = require('../DB/Models/appointment'),
    //transporter = require('../Helpers_and_Prerequisites/libs_required').transporter,
    user = require('../DB/Models/user');

    // Router is mounted at /api/v1/appointments , all routes after this will be prefixed with this

router.get("/" , async(req,res) => {
    // queries.getAll(req , res , "Appointments")
    appointment.find({})
        .populate("Capacity")
        .exec((err, users) => {
            if (err) console.log(err)
            res.send(users);
        });
})

router.post("/" , async(req , res)=> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const { 
        firstName ,
        Surname , 
        Gender,
        Mothers_Maiden_Name,
        Street_Address,
        City_Address,
        County,
        Mobile , 
        Alternate_Number,
        Email: email,
        DOB , 
        Medical_Card , 
        PPS_Number , 
        Bleeding_Disorder_Or_Anticoagulation,
        Car_Reg , 
        Surgery ,  
        Month , 
        DayName , 
        DayDate , 
        Time 
    } = req.body
    let emailShell = {};
    const userData = {
        firstName: firstName,
        Surname: Surname,
        Gender: Gender,
        Mothers_Maiden_Name: Mothers_Maiden_Name,
        Street_Address: Street_Address,
        City_Address: City_Address,
        County: County,
        Mobile: Mobile,
        Alternate_Number: Alternate_Number,
        Bleeding_Disorder_Or_Anticoagulation: Bleeding_Disorder_Or_Anticoagulation,
        Email: email,
        DOB: DOB,
        Medical_Card: Medical_Card,
        PPS_Number:PPS_Number,
        Car_Reg: Car_Reg,
        Surgery: Surgery
    };
    let createdUser = await user.create(userData)
    let foundAppointment = await appointment.find({Time: Time, Month: Month, DayName: DayName , DayDate: DayDate})
    const foundUser = await user.findById(createdUser._id);
    console.log(`Error is here - line 66 ${createdUser._id}`)
    emailShell = {
        to: `${email}`,
        from: `noreplywhmc@gmail.com`,
        subject: `Confirmation of your Vaccine Booking`,
        text: `
            This email is to confirm you have made an appointment for your Vaccine, find appointment details below
            Date: ${DayName} ${DayDate} ${Month}
            Time: ${Time}\n
            You can update or edit the booking at https://whmcflu.com/userview?id=${createdUser._id}`,
        html: `
            <div class="outerEmailContainer">
                <div class="innerEmailContainer" style="height: 70vh;
                    justify-content: space-around;border: 1px solid #eee;padding: 1em;background: white;">
                    <div class="emailRow" style="display: grid;
                    place-items: center;">
                    <img src="https://whmccovid.com/Resources/Images/WHMC_Main.jpg" style="width: 15vw;
                    border-radius: 50%;
                    height: 15vw;
                    object-fit: cover;">
                    </div>
                    <div class="emailRow" style="text-align: center;">
                    <h1 style="font-size: 1.4em;">This email is to confirm ${firstName} ${Surname} has made an appointment for a vaccination.</h1>
                    </div>
                    <div class="emailRow">
                    <h2>Your Appointment Details are as follows:</h2>
                    </div>
                    <div class="emailRow">
                    <h2>Date: ${DayName} ${DayDate} ${Month}<br>Time: ${Time}</h2>
                    </div>
                    <div class="emailRow">
                    <h4><br>You can update or edit the booking at https://whmccovid.com/userview?id=${createdUser._id}</h4>
                    </div>
                    <div class="emailRow">
                    <h4><br>Do not use the buttons below.</h4>
                    </div>
                </div>
            </div>
        `
    }
    console.log(`Error is here - line 108 ${createdUser._id}`)
    if (foundAppointment.length !== 0) {
        await appointment.updateOne({ _id: foundAppointment[0]._id }, { $push: { Capacity: createdUser._id }});
        foundUser.Appointments.push(foundAppointment[0]._id);
    } else {
        let createdAppointment = await appointment.create({ 
            Month: Month,
            DayName: DayName,
            DayDate: DayDate,
            Time: Time,
            Capacity: createdUser._id
        })
        await createdAppointment.save();
        foundUser.Appointments.push(createdAppointment);
    }
    console.log(`Error is here - line 123 ${createdUser._id}`)
    await foundUser.save();
    try {
        await sgMail.send(emailShell);
        // Changed this back to sendgrid because of the weird recaptha bug with nodemailer and google
        //await transporter.sendMail(emailShell);
    } catch (error) {
        if (error.response) {
            console.log(`Error is here - line 127 ${error}`)
            console.error(error.response.body)
        }
    }
    await user.findById(createdUser._id).populate("Appointments").exec((err, appointment_details) => {
        if (err) console.log(`Error is here - line 132 ${err} ${appointment_details}`)
        return res.send(appointment_details)
    });
    
})

router.get("/appt/:id", async (req, res , next) => {
    try {
        const apptFound = await appointment.findById(req.params.id)
        if(!apptFound) return next()
        return res.send(apptFound)
    } catch (error) {
        next(error)
    }
})

router.put("/:id", async(req, res, next) => {
    try {
        const { userId , Time , DayDate , DayName , Month } = req.body,
        { id: appointment_id } = req.params,
        user_Found = await user.findById(userId),
        oldAppointment = await appointment.findById(appointment_id),
        appointment_Already_Made = await appointment.find({ Time: Time, Month: Month, DayName: DayName, DayDate: DayDate });
        
        if(oldAppointment.Capacity.length === 1){
            // If Appointment has 1 person booked in, updating it should
            // Remove the appointment entirely
            oldAppointment.remove()
        } else {
            // If Appointment has 2 people booked in, updating it should
            // Remove that user ref from appointment entirely
            let appointment_Kept = oldAppointment.Capacity.filter(appt => appt.toString() !== userId)
            await appointment.updateOne({ _id: appointment_id }, {
                $set: {
                    Capacity: appointment_Kept
                }
            })
        }
        // Remove that appointment ref from user entirely
        let appointment_Kept = user_Found.Appointments.filter(appt => appt.toString() !== appointment_id)
        await user.updateOne({ _id: userId }, {
            $set: {
                Appointments: appointment_Kept
            }
        })
        
        if(appointment_Already_Made.length === 1){
            await appointment.updateOne({ _id: appointment_Already_Made[0]._id }, { $push: { Capacity: user_Found._id } });
            await user.updateOne({ _id: user_Found._id }, {
                $set: {
                    Appointments: appointment_Already_Made[0]._id
                }
            })
        } else {
            let createdAppointment = await appointment.create({
                Month: Month,
                DayName: DayName,
                DayDate: DayDate,
                Time: Time,
                Capacity: user_Found._id
            })
            await createdAppointment.save();
            await user.updateOne({_id: user_Found._id}, {
                $set: {
                    Appointments: createdAppointment
                }
            })
        }
        await user.findById(userId).populate("Appointments").exec((err, appointment_details) => {
                if (err) console.log(err)
                return res.send(appointment_details)
        }); 
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async(req, res, next) => {
    try {
        const { id: appointment_id } = req.params,
            { userId } = req.query,
            appointment_Found = await appointment.findById(appointment_id);
                // userId = appointment_Found.Capacity.filter(appt => appt.toString() === userID);
        let appointment_Kept = appointment_Found.Capacity.filter(appt => appt.toString() !== userId)
        if(appointment_Kept.length > 0){
            await appointment.updateOne({ _id: appointment_id }, {
                $set: {
                    Capacity: appointment_Kept
                }
            })
        } else {
            await appointment.findByIdAndRemove(appointment_id)
        }
        await user.updateOne({ _id: userId }, {
            $set: {
                Appointments: appointment_Kept
            }
        })
        const userFound = await user.findById(userId).populate("Appointments").exec();
        if (!userFound) return next()
        return res.send(userFound)
        
    } catch (error) {
        next(error)
    }
})

module.exports = router