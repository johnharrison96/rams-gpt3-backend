import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ response: openaiRes.data.choices[0].message.content });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to get response from OpenAI.' });
  }
}
