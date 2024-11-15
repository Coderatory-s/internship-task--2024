import nodemailer from 'nodemailer';

export const sendEmail = async (to: string[], formLink: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to.join(', '),
        subject: 'Access Your Form',
        text: `Hello! Click on the link to access the form: ${formLink}`,
    };

    return transporter.sendMail(mailOptions);
};
