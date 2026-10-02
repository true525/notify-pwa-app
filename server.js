const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Server is running' });
});

app.post('/api/send-notification', async (req, res) => {
  const { title, message, target } = req.body || {};

  if (!title || !message) {
    return res.status(400).json({
      ok: false,
      error: 'title and message are required',
    });
  }

  const appId = process.env.ONE_SIGNAL_APP_ID;
  const apiKey = process.env.ONE_SIGNAL_API_KEY;

  if (!appId || !apiKey) {
    return res.status(503).json({
      ok: false,
      error: 'OneSignal credentials are not configured. Add ONE_SIGNAL_APP_ID and ONE_SIGNAL_API_KEY to your .env file.',
    });
  }

  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        app_id: appId,
        included_segments: ['All'],
        headings: { en: title, ja: title },
        contents: { en: message, ja: message },
        data: { target: target || 'all' },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        error: 'OneSignal delivery failed',
        details: result,
      });
    }

    return res.json({
      ok: true,
      status: 'queued',
      provider: 'onesignal',
      data: {
        title,
        message,
        target: target || 'all',
        sentAt: new Date().toISOString(),
        onesignal: result,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: 'Failed to connect to OneSignal',
      details: error.message,
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
