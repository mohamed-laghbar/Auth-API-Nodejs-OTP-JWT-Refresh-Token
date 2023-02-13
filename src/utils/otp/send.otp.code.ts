import { NextFunction } from 'express';
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const user = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_PASS;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user,
        pass,
    },
});

const sendConfirmationEmail = async (name: string, email: string, otp_code: number,next:NextFunction): Promise<Error | void> => {
    console.log("Check");
    transport
        .sendMail({
            from: user,
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p> Please confirm your account by entring the following code<b> ${otp_code}<b></p>
          </div>`,
        })
        .catch((err) => next(err))
};



export { sendConfirmationEmail };
