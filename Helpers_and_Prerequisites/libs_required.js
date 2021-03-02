const express = require('express')
    mongoose = require('mongoose')
    bodyParser = require('body-parser')
    cors = require('cors')
    sgMail = require('@sendgrid/mail')
    nodemailer = require('nodemailer')
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'noreplywhmc@gmail.com',
          pass: 'whmcadmin'
        }
    });

module.exports = {
    express,
    sgMail,
    transporter
}