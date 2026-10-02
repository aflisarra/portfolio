const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Échappe le HTML pour éviter l'injection
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

async function sendContactMessage({ name, email, subject, message }) {
  console.log('RESEND_API_KEY présente :', !!process.env.RESEND_API_KEY);
  console.log('MAIL_TO présent :', !!process.env.MAIL_TO);

  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY manquante');
  }

  const to = process.env.MAIL_TO || 'aflisarra19@gmail.com';

  const html = `
    <h2>Nouveau message depuis le portfolio</h2>

    <p><strong>Objet :</strong> ${escapeHtml(subject)}</p>

    <p>
      <strong>Nom &amp; entreprise :</strong>
      ${escapeHtml(name)}
    </p>

    <p>
      <strong>Email :</strong>
      <a href="mailto:${escapeHtml(email)}">
        ${escapeHtml(email)}
      </a>
    </p>

    <hr />

    <p style="white-space: pre-line">
      ${escapeHtml(message)}
    </p>
  `;

  const { data, error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: [to],
    replyTo: email,
    subject: `[Portfolio] ${subject.replace(/[\r\n]/g, ' ')}`,
    html,
  });

  if (error) {
    console.error('Erreur Resend :', error);
    throw new Error(error.message || 'Erreur lors de l’envoi de l’email');
  }

  console.log('Email envoyé avec succès :', data?.id);

  return data;
}

module.exports = { sendContactMessage };