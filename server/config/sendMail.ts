const nodemailer = require("nodemailer");
import { OAuth2Client } from "google-auth-library";

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_EMAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

const sendEmail = async (to: string, url: string, txt: string) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const access_token = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        access_token,
      },
    });

    const mailOptions = {
      from: SENDER_EMAIL,
      to: to,
      subject: "HADAF - Validation your email address",
      html: `
                <div style="max-width: 700px; background: #0f1f2f; color: #e7e0b9; margin: auto; padding: 10px 20px; font-size: 110%;">
                  <div style="border: 2px solid #ab915d; padding: 10px 20px;">
                    <h1 style="color: ##895602; font-size: 30px; text-transform: uppercase; font-weight: 700; padding-bottom: 0.35rem;">HADAF</h1>
                    <h2 style="text-align: center; text-transform: uppercase; color: #ab915d;">Welcome To Hadaf!</h2>
                    <p>
                        Congratulations! You're almost set to start using Hadaf.
                        Just click the button below to validate your email address.
                    </p>

                    <a href=${url} style="border: 2px solid #ab915d; font-size: 16px; font-weight: 400; text-align: center; text-decoration: none; color: #e7e0b9; padding: 10px 20px; margin: 10px; display: inline-block;">${txt}</a>
                    <p>If the button doesn't work for any reason, you can also click on the link below</p>
                    <a href=${url} style="text-decoration: underline;">Validate your email address</a>
                  </div>
                </div>
            `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err: any) {
    console.log(err);
  }
};

export default sendEmail;
