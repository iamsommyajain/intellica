import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendSummaryEmail = async (to, summary, videoUrl) => {
  await transporter.sendMail({
    from: `"Intellica" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your YouTube Video Summary",
    html: `
      <h3>YouTube Video Summary</h3>
      <p>${summary}</p>
      <a href="${videoUrl}">Watch full video</a>
    `,
  });
};
