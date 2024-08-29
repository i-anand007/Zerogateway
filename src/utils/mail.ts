import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport"

const transport = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    port: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    secure: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID !== 'development', // true
    auth: {
        user: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        pass: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
    }
} as SMTPTransport.Options)

type SendEmailTo = {
    sender: Mail.Address,
    receipients: Mail.Address[],
    subject: string;
    message: string;
}

export const sendEmail = async (to: SendEmailTo) => {
    const { sender, receipients, subject, message } = to
    
    return await transport.sendMail({
        from: sender,
        to: receipients,
        subject,
        html: message,
        text: message,
    })
}