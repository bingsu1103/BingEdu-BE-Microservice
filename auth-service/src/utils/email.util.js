const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }
);

const getWelcomeTemplate = (userName) => {
    return {
        subject: "Welcome to BingEdu – Your Learning Journey Begins!",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c3e50; text-align: center;">Welcome to BingEdu! 🎓📚</h1>
        <p style="font-size: 16px;">Hello <strong>${userName}</strong>,</p>
        <p style="font-size: 16px;">We’re thrilled to welcome you to the BingEdu learning community! Your account has been successfully created, and your educational journey with us is about to begin.</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2c3e50; margin-top: 0;">With BingEdu, you can:</h2>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin: 10px 0;">🎯 Access a wide range of online courses</li>
            <li style="margin: 10px 0;">💡 Enjoy interactive learning tools and resources</li>
            <li style="margin: 10px 0;">📅 Track your progress with personalized learning plans</li>
          </ul>
        </div>
        <p style="font-size: 16px;">If you have any questions or need assistance, feel free to reach out to our support team anytime.</p>
        <p style="font-size: 16px;">Best regards,<br>The BingEdu Team</p>
      </div>
    `,
    };
};

const getResetPasswordTemplate = (userName, otp) => {
    return {
        subject: "Password Reset Verification Code",
        html: `
      <h1>Password Reset Request</h1>
      <p>Hello ${userName},</p>
      <p>You have requested to reset your password. Here is your verification code:</p>
      <h2 style="color: #d32f2f;">${otp}</h2>
      <p>This code will expire in 10 minutes.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
    };
};

const sendWelcomeEmail = async (to, userName) => {
    try {
        const template = getWelcomeTemplate(userName);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: template.subject,
            html: template.html,
        };

        await transporter.sendMail(mailOptions);
        return {
            status: true,
            message: "Email sent successfully",
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            status: false,
            message: "Cannot send email: " + error.message,
        };
    }
};

const sendResetPasswordEmail = async (to, userName, otp) => {
    try {
        const template = getResetPasswordTemplate(userName, otp);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: template.subject,
            html: template.html,
        };

        await transporter.sendMail(mailOptions);
        return {
            status: true,
            message: "Email sent successfully",
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            status: false,
            message: "Cannot send email: " + error.message,
        };
    }
};
module.exports = { sendWelcomeEmail, sendResetPasswordEmail };