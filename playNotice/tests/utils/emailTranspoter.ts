import * as nodemailer from 'nodemailer';

import { uploadFile, zipDirectory } from './emailUtils';

const date = new Date();
const currentDate =
  date.getUTCMonth() +
  1 +
  '-' +
  date.getUTCDate() +
  '-' +
  date.getUTCFullYear();

async function sendEmail(passed: number, failed: number) {
  const userEmail = process.env.PN_USERNAME;
  const userPassword = process.env.GMAIL_PASSWORD;

  await zipDirectory('playwright-report', 'playwright-report.zip');
  const link = await uploadFile();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: userEmail,
      pass: userPassword,
    },
  });

  const mailOptions = {
    from: userEmail,
    to: 'adnan@plannotice.com',
    subject: `Automation Web Report - ${currentDate} `,
    html: `<h2><strong>Automation Test Execution Summary</strong></h2>
        <h3><strong>Overall Test Cases: </strong>${' '}${passed + failed}</h3>
        <h3 style="color: red;"><strong>Failed Tests:</strong>${' '}${failed}</h3>
        <h3 style="color: green;"><strong>Passed Tests:</strong>${' '}${passed}</h3>
        <br/>
        <a href="${link}">
        <strong>Report Link</strong>
        </a>`,
  };

  await transporter.sendMail({ ...mailOptions });
}

export default sendEmail;
