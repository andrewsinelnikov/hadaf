import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL_ADDRESS,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

const sendEmail = async (to: string, url: string, subject: string) => {
  const mailOptions = {
    from: `"Hadaf" <${process.env.SENDER_EMAIL_ADDRESS}>`,
    to,
    subject: `Hadaf — ${subject}`,
    html: `
      <div style="max-width:600px;margin:auto;background:#0f1f2f;color:#e7e0b9;padding:40px 32px;font-family:'Helvetica Neue',sans-serif;">
        <div style="border:1px solid #ab915d;padding:32px;">
          <h1 style="margin:0 0 4px;font-size:22px;letter-spacing:0.15em;text-transform:uppercase;color:#ab915d;">HADAF</h1>
          <p style="margin:0 0 28px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(231,224,185,0.4);">
            Your time. Your goals. Your result.
          </p>
          <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#e7e0b9;">${subject}</h2>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:rgba(231,224,185,0.7);">
            You're almost set. Click the button below to activate your account and start working towards your goals.
          </p>
          <a href="${url}"
             style="display:inline-block;padding:12px 28px;background:#ab915d;color:#0f1f2f;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;">
            Activate account
          </a>
          <p style="margin:28px 0 0;font-size:12px;color:rgba(231,224,185,0.3);">
            If the button doesn't work, copy this link into your browser:<br/>
            <a href="${url}" style="color:rgba(171,145,93,0.6);word-break:break-all;">${url}</a>
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;