// sendEmail.js

import { Resend } from 'resend';  // If using ESM (recommended in modern projects)
import dotenv from 'dotenv';

// If using CommonJS instead, use:
// const { Resend } = require('resend');
dotenv.config(); // Load variables from .env
// console.log("asdad");
// console.log(process.env,process.env.API_KEY,process.env.PORT);

const key = process.env.API_KEY  
// const ans = process.env.PORT
// console.log(key);

const resend = new Resend(key); // 🔑 Replace with your actual API key
// // console.log(resend);
export const SendEmail = async (email, verificationCode) => {
  try {
    // Generate OTP digit boxes using <span> (not <td>)
    const otpDigits = verificationCode.split('').map(d =>
      `<span style="
        display: inline-block;
        background-color: #000;
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        padding: 10px 15px;
        margin: 0 4px;
        border-radius: 6px;
        letter-spacing: 2px;
      ">${d}</span>`
    ).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Verify Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #fff; font-family: Arial, sans-serif; color: #000;">
          <table align="center" width="100%" style="max-width: 600px; padding: 40px;">
            <tr>
              <td align="center">
                <h1 style="margin-bottom: 5px;">Verify Your Email</h1>
                <p style="font-size: 16px; margin-top: 0;">One-Time OTP</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px 0; font-size: 16px;">
                Hello,<br />
                Your One-Time Password (OTP) is:
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 10px 0;">
                <div style="text-align: center; user-select: text;">
                  ${otpDigits}
                </div>
              </td>
            </tr>
            <tr>
              <td style="font-size: 14px; text-align: left; padding-top: 20px;">
                This OTP is valid for 10 minutes. If you did not request this, please ignore this email.<br /><br />
                Thanks,<br />
                YourApp Team
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify Your Email - OTP Inside',
      html: htmlContent
    });

    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};



// SendEmail();

