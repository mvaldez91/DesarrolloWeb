const nodemailer = require('nodemailer')

const send_email = async (email, subject, html)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secureConnection: false,
        tls: {
            ciphers: "SSLv3"
        },
        auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PASS
        }
    });

    const mailOptions = {
        from: process.env.GOOGLE_APP_EMAIL,
        to: email,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log('Error while sending email to '+ email, error)
        }
    })
}

module.exports.send_email = send_email