import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const handleRefund = async (req, res) => {
  const { userId, message } = req.body;
  const image = req.file;

  if (!userId || !message || !image) {
    return res.status(400).json({ error: 'User ID, message, and image are required.' });
  }

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail'
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL, // Replace with recipient's email
      subject: 'Refund Request',
      text: `User ID: ${userId}\nMessage: ${message}`,
      attachments: [
        {
          filename: image.originalname,
          content: image.buffer,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Refund request submitted successfully.' });
  } catch (error) {
    console.error('Error handling refund request:', error);
    res.status(500).json({ error: 'Failed to handle refund request.' });
  }
};
