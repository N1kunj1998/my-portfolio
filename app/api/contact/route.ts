import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'njkhakhkhar@gmail.com',
      subject: `New message from ${name}`,
      replyTo: email,
      text: `
🧑‍💻 New message from your portfolio contact form

📨 Name: ${name}
📧 Email: ${email}

🕒 Sent on: ${timestamp}

💬 Message:
${message}

—————————————
🔁 Please reply directly to this email to respond.
      `.trim(),
    });

    console.log('✅ Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
