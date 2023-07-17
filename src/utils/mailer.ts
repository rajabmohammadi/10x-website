import nodeMailer from "nodemailer";
let transport = nodeMailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: 'rajab.mohammadi222@gmail.com',
        pass: 'xsmtpsib-ec8bd16588a1a6c2c7ddecd298a04f9f53476a10232c5138ebec744a72325350-G0U1p8SjnQV4XECs'
    }
});

class mailerService {
    forgotEmail(email: string, subject: string, text: string) {
        let message = {
            from: 'rajab.mohammadi222@gmail.com', // Sender address
            to: email,         // List of recipients
            subject: subject, // Subject line
            text: text, // Plain text body
            html: `<a href="
            <h1>Forgot Password</h1>
            </a>`, // html body
        };
        transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        });
    }

}

export default new mailerService();