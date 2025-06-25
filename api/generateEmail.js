const cohere = require('cohere-ai');

module.exports = async (req, res) => {
  try {
    // 1. API Key چیک کریں
    if (!process.env.COHERE_API_KEY) {
      return res.status(400).json({
        error: "API KEY نہیں ملی! Vercel میں COHERE_API_KEY سیٹ کریں"
      });
    }

    // 2. Cohere کو انیشیالائز کریں
    cohere.init(process.env.COHERE_API_KEY);

    // 3. صارف کا ڈیٹا حاصل کریں
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        error: "براہ کرم معلومات درج کریں (پروپٹ) خالی نہیں ہو سکتا"
      });
    }

    // 4. Cohere API کو کال کریں
    const response = await cohere.generate({
      model: 'command',
      prompt: `درج ذیل معلومات کی بنیاد پر ایک پیشہ ورانہ کولڈ ایمیل لکھیں:\n\n${prompt}\n\nایمیل:`,
      max_tokens: 400,
      temperature: 0.7,
    });

    // 5. کامیاب جواب واپس بھیجیں
    res.status(200).json({
      email: response.body.generations[0].text
    });

  } catch (error) {
    // 6. خرابی کی صورت میں
    console.error("Cohere Error:", error);
    res.status(500).json({
      error: error.message,
      solution: "براہ کرم API Key اور انٹرنیٹ کنکشن چیک کریں"
    });
  }
};
