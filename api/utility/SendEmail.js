import nodemailer from 'nodemailer';


// create emial
export const SendEmail = async (to, subject, text) => {

    try {
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "emaildefaultemail@gmail.com",
                pass: "htfnypnfilvtmoiy"
            }
        });

        // send email
        await transport.sendMail({
            from : 'info.nahian13@gmail.com',
            to : to,
            subject : subject,
            text : text
        });

    } catch (error) {
        console.log(error);
    }

}