import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const link = "http://localhost:3000/verify-email?token=" + token;

  return resend.emails.send({
    from: "testring@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
  });
}
