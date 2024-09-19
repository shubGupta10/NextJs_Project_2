import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/UserModel'

//send email to current user
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        //checking email type and doing for it.
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }


        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "7fafcfe231d769",
              pass: "173a9978c88693"
            }
          });

        const mailOption = {
            from: "shubham@shubham.ai",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email": "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOption);
        return mailResponse
    } catch (error) {
        throw new Error();
    }
}