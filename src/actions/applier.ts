import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
dotenv.config();

const Api_key = process.env.SENDGRID_API_KEY as string;

export default async function mail(
  name: string,
  email: string,
  subject: string,
  html: string
) {
  sgMail.setApiKey(Api_key);
  const msg = {
    to: email, 
    from: 'Dsuper03.dev@gmail.com', 
    subject: subject,
    text: `Catalyzeeee`,
    html: html,
  };

  const response = await sgMail.send(msg);

  if (response) {
    console.log('Sent email');
    return true;
  } else {
    console.log('some error occured');
    return false;
  }
}
