export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Валидация
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    // Здесь можно добавить отправку email
    // Например через SendGrid, Nodemailer и т.д.

    // Для демо просто возвращаем успех
    return res.status(200).json({ 
      success: true, 
      message: 'Сообщение отправлено!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}