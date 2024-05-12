import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email:string,token:string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your Email",
        html: `<p><a href="${confirmLink}">Click here to confirm</a></p>`
    })

}
export const sendResetEmail = async (email:string,token:string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset password",
        html: `<p><a href="${confirmLink}">Click here to reset</a></p>`
    })

}
export const sendTwoFactorTokenEmail = async (email:string,token:string) => {

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA Code",
        html: `<p>Your Code : ${token}</p>`
    })

}
