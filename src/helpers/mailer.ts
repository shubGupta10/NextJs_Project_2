import nodemailer from 'nodemailer'


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailOption = {
            from: "shubham@shubham.ai",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email": "Reset your Password",
            html: "<b>Hello world?</b>", 
        }

        const mailResponse = await transporter.sendMail(mailOption);
        return mailResponse
    } catch (error) {
        throw new Error();
    }
}