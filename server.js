// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // Your API key
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `You are Luma, a friendly and knowledgeable AI ocean guide specializing in Diel Vertical Migration (DVM) and marine light pollution. 

Keep responses concise (2-3 paragraphs max), warm, scientific, and helpful. Use emojis sparingly when appropriate.

Context: Diel Vertical Migration is the daily mass movement of marine organisms (zooplankton, fish, etc.) from deep waters to surface waters at night and back down during the day. This is the largest migration of biomass on Earth. Artificial light from ships, coastal cities, and offshore platforms disrupts this natural rhythm, affecting the entire marine food web.

User question: ${message}`
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.content && data.content[0]) {
      res.json({ response: data.content[0].text });
    } else {
      throw new Error('Invalid response from Claude API');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});