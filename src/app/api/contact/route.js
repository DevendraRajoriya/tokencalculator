import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const subjectLabel = subject
      ? {
          bug: "🐛 Bug Report",
          feature: "💡 Feature Request",
          pricing: "💰 Pricing / Data Issue",
          partnership: "🤝 Partnership / Collaboration",
          privacy: "🔐 Privacy / Data Request",
          other: "💬 Other",
        }[subject] ?? subject
      : "💬 General Inquiry";

    const { data, error } = await resend.emails.send({
      from: "Token Calculator <noreply@tokencalculator.app>",
      to: ["hello@tokencalculator.app"],
      replyTo: email,
      subject: `[Contact] ${subjectLabel} – from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
          <div style="background: #ff4800; padding: 20px 28px;">
            <h1 style="margin: 0; font-size: 20px; color: white;">📬 New Contact Form Submission</h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.8);">tokencalculator.app</p>
          </div>
          <div style="padding: 28px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; width: 100px;">Name</td>
                <td style="padding: 8px 0; color: #e0e0e0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ff4800;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Topic</td>
                <td style="padding: 8px 0; color: #e0e0e0;">${subjectLabel}</td>
              </tr>
            </table>
            <div style="background: #1a1a1a; border-left: 3px solid #ff4800; padding: 16px 20px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin: 0; color: #e0e0e0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin: 20px 0 0; font-size: 12px; color: #555;">
              Hit <strong style="color:#e0e0e0;">Reply</strong> to respond directly to ${name}.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
