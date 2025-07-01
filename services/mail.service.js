const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vinod4tambe@gmail.com",
    pass: "yo", // Not your Gmail login password
  },
});

(async () => {
  const info = await transporter.sendMail({
    from: '"Your Name" <your-email@gmail.com>',
    to: "vinod1tambe@gmail.com",
    subject: "Real Email ✔",
    text: "This is a real email sent to your Gmail inbox",
    html: "<b>This is a real email</b>",
  });

  console.log("Message sent:", info.messageId);
})();
