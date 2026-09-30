const { sendContactMessage } = require('../Service/contactService');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_SUBJECTS = [
  'Opportunité de Recrutement — CDI',
  "Opportunité d'Alternance — Backend / Fullstack",
  'Échange rapide de 15 min',
];

async function sendMessage(req, res) {
  const name = (req.body?.name ?? '').trim();
  const email = (req.body?.email ?? '').trim();
  const subject = (req.body?.subject ?? '').trim();
  const message = (req.body?.message ?? '').trim();

  if (!name || name.length > 150) {
    return res.status(400).json({ error: 'Nom invalide.' });
  }
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Adresse email invalide.' });
  }
  if (!ALLOWED_SUBJECTS.includes(subject)) {
    return res.status(400).json({ error: 'Objet invalide.' });
  }
  if (message.length < 10 || message.length > 5000) {
    return res.status(400).json({ error: 'Le message doit contenir entre 10 et 5000 caractères.' });
  }

  try {
    await sendContactMessage({ name, email, subject, message });
    return res.status(200).json({ message: 'Message envoyé avec succès.' });
  } catch (err) {
    console.error('Erreur envoi email :', err);
    return res.status(500).json({ error: "Impossible d'envoyer le message pour le moment." });
  }
}

module.exports = { sendMessage };
