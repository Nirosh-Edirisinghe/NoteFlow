import nodemailer from "nodemailer";

// Configure your email transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // or your SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});