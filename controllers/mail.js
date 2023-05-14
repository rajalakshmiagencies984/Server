const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

module.exports.otp_sendEmail = async (req, res) => {
  var otp = req.body.otp;
  var user_mail = req.body.email


  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });


  let info = await transporter.sendMail({
    from: "rajalakshmiagencies984@gmail.com",
    to: user_mail,
    subject: "Rajalakshmi Agencies | OTP",
    text: "",
    html: `<p> Here the OTP for your verification => <b> ${otp} </b><p>`,
  });

  info.messageId ? res.status(200).json('OTP Send Successfully') : res.status(500).json('Error Occured!')

}


module.exports.sendMessage =async(email,message)=>{
 try{
   let transporter = nodemailer.createTransport({

     host: "smtp.ethereal.email",
     port: 587,
     secure: false,
     service: "Gmail",
     auth: {
       user: process.env.USER,
       pass: process.env.PASS,
      },
    });


    let info = await transporter.sendMail({

      from: "rajalakshmiagencies984@gmail.com",
      to: email,
      subject: "Message from Rajalasksmi Agencies",
      text: "Insta Seva",
      html: `<p>${message}<p>`,
    })


     info.messageId ? console.log('Message Sent') :console.log('Error Occured!')
  }
  catch(error){
    console.log(error)
  }

}







