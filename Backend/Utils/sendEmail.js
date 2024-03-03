const nodeMailer = require("nodemailer");
const sendEmail = async(options)=>{

    const transporter = nodeMailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_USER,
            pass:process.env.SMPT_PASS
        }
    });

    const mailOptions = {
        from:process.env.SMPT_SERVICE,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    transporter.sendMail(mailOptions)
}
module.exports = sendEmail;