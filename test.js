const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'noreplywhmc@gmail.com',
        pass: 'whmcadmin'
    }
});

let mailOptions = {
    from: 'noreplywhmc@gmail.com',
    to: 'oceallaighadam96@gmail.com',
    subject: 'Test',
    html: `
    <div class="outerEmailContainer">
    <div class="innerEmailContainer" style="height: 70vh;
      justify-content: space-around;border: 1px solid #eee;padding: 1em;background: white;">
      <div class="emailRow style="margin:0 auto;">
        <img src="https://whmccovid.com/Resources/Images/WHMC_Main.jpg" style="width: 15vw;
      border-radius: 50%;
      height: 15vw;
      object-fit: cover;">
      </div>
      <div class="emailRow" style="text-align: center;">
        <h1 style="font-size: 1.4em;">This email is to confirm Adam O' Ceallaigh has made an appointment for a vaccination, find appointment details below. </h1>
      </div>
      <div class="emailRow">
        <h3>Your Appointment Details are as follows:</h3>
      </div>
      <div class="emailRow">
        <h2>Date: Friday 1rst January<br>Time: 15:47</h2>
      </div>
      <div class="emailRow">
        <h4><br>You can update or edit the booking at https://whmccovid.com/userview</h4>
      </div>
    </div>
    `
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});