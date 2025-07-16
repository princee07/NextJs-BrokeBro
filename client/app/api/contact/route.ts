import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your SMTP provider
    auth: {
      user: process.env.BROKEBRO_MAIL_USER, // e.g., brokebroindia@gmail.com
      pass: process.env.BROKEBRO_MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "brokebroindia@gmail.com",
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// --- TEST EMAIL ENDPOINT ---
export async function PUT(req: Request) {
  // This endpoint sends a test email to the address provided in the body
  const { to } = await req.json();
  if (!to) return NextResponse.json({ success: false, error: 'Missing "to" address' }, { status: 400 });

  if (!process.env.BROKEBRO_MAIL_USER || !process.env.BROKEBRO_MAIL_PASS) {
    return NextResponse.json({ success: false, error: 'Email environment variables not set' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.BROKEBRO_MAIL_USER,
      pass: process.env.BROKEBRO_MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `BrokeBro Test <${process.env.BROKEBRO_MAIL_USER}>`,
      to,
      subject: "BrokeBro Test Email",
      text: "This is a test email from BrokeBro. If you received this, email sending is working!",
    });
    return NextResponse.json({ success: true, message: `Test email sent to ${to}` });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.stack : String(error) }, { status: 500 });
  }
}
