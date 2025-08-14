import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, hp } = req.body || {};

  // Honeypot: silently succeed (don’t tip off bots)
  if (hp) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM || 'Website <noreply@yourdomain.com>',
      to: (process.env.CONTACT_TO || 'you@yourdomain.com')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      subject: `[Contact] ${subject || 'New message'}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || ''}\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Email send failed' });
  }
}