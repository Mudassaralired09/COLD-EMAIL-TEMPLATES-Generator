import cohere from 'cohere-ai';

export default async function handler(req, res) {
  try {
    // API Key چیک
    if (!process.env.COHERE_API_KEY) {
      throw new Error("Cohere API Key میسر نہیں");
    }
    
    cohere.init(process.env.COHERE_API_KEY);
    
    const { prompt } = req.body;
    if (!prompt) throw new Error("پروپٹ میسر نہیں");

    const response = await cohere.generate({
      model: 'command',
      prompt: `درج ذیل معلومات کی بنیاد پر پیشہ ورانہ کولڈ ای میل لکھیں:\n${prompt}\n\nایمیل:`,
      max_tokens: 400,
      temperature: 0.7,
    });

    // صحیح JSON فارمیٹ
    return res.status(200).json({ 
      email: response.body.generations[0].text 
    });
    
  } catch (error) {
    // تفصیلی خرابی کا پیغام
    return res.status(500).json({ 
      error: error.message || "نا معلوم خرابی",
      solution: "براہ کرم API Key اور نیٹ ورکنگ کنکشن چیک کریں"
    });
  }
}
