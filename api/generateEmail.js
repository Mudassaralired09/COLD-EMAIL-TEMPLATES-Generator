import cohere from 'cohere-ai';

export default async function handler(req, res) {
    cohere.init(process.env.COHERE_API_KEY);
    const { prompt } = req.body;
    
    try {
        const response = await cohere.generate({
            model: 'command',
            prompt: `درج ذیل معلومات کی بنیاد پر ایک پیشہ ورانہ کولڈ ایمیل لکھیں۔
موضوع: ${prompt}
ایمیل:`,
            max_tokens: 400,
            temperature: 0.7,
        });

        res.status(200).json({ 
            email: response.body.generations[0].text 
        });
    } catch (error) {
        res.status(500).json({ 
            error: "API کال ناکام۔ API Key چیک کریں۔" 
        });
    }
}
