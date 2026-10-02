const nodemailer = require('nodemailer');

// Transporteur Gmail (nécessite un "mot de passe d'application" Google)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // Échoue vite si le SMTP ne répond pas (au lieu de bloquer la requête)
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

// Échappe le HTML pour éviter l'injection dans le corps du mail
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Envoie le message du formulaire de contact vers la boîte de réception.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
async function sendContactMessage({ name, email, subject, message }) {
    console.log('MAIL_USER présent :', !!process.env.MAIL_USER);
  console.log('MAIL_PASS présent :', !!process.env.MAIL_PASS);
  console.log('MAIL_TO présent :', !!process.env.MAIL_TO);
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error('MAIL_USER / MAIL_PASS manquants dans le fichier .env');
  }
  const to = process.env.MAIL_TO || 'aflisarra19@gmail.com';

  const html = `
    <h2>Nouveau message depuis le portfolio</h2>
    <p><strong>Objet :</strong> ${escapeHtml(subject)}</p>
    <p><strong>Nom &amp; entreprise :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <hr />
    <p style="white-space: pre-line">${escapeHtml(message)}</p>
  `;

  return transporter.sendMail({
    from: `"Portfolio – ${name.replace(/["\r\n]/g, '')}" <${process.env.MAIL_USER}>`,
    to,
    replyTo: email, // "Répondre" dans Gmail répond directement à l'entreprise
    subject: `[Portfolio] ${subject.replace(/[\r\n]/g, ' ')}`,
    text: `Objet : ${subject}\nNom & entreprise : ${name}\nEmail : ${email}\n\n${message}`,
    html,
  });
}

module.exports = { sendContactMessage };
