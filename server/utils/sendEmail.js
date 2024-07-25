import nodeMailer from "nodemailer"


const sendEmail = async(options)=>{

    const transporter = nodeMailer.createTransport({
        host : "smtp.gmail.com",
        port : 465,
        service :process.env.SMTP_SERVICE,
        auth : {
            user : process.env.SMTP_MAIL,
            pass : process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from :"",
        to : options.email,
        subject: options.subject,
        text: options.message

    }


    await transporter.sendMail(mailOptions)
 
    }


// const transporter = nodeMailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//      user: process.env.SMTP_MAIL,
//      pass: process.env.SMTP_PASSWORD,
//     },
//    });
 
//    const sendEmail = async (options) => {
//     const mailOptions = {
//      from: '',
//      to: options.email,
//      subject: options.subject,
// //      html:
// //    '<p>Please click on the following link to verify your email address:</p>' +
// //    '<a href="http://localhost:3000/verify/' +
// //    token +
// //    '">http://localhost:3000/verify/' +
// //    token +
// //      '</a>',
//    };
 
//    await transporter.sendMail(mailOptions);
//    };
 

export default sendEmail