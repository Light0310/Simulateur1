import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const modelsToTry = [
  'gemini-3.5-flash',
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.5-flash-lite',
];

async function testAll() {
  const apiKey = process.env.GEMINI_API_KEY;
  for (const m of modelsToTry) {
    try {
      console.log(`Trying ${m}...`);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
      const res = await axios.post(
        url,
        {
          contents: [{ role: 'user', parts: [{ text: 'Salam, marhba bik' }] }],
        },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );
      console.log(`SUCCESS with ${m}!`);
      console.log(res.data?.candidates?.[0]?.content?.parts?.[0]?.text);
      return m;
    } catch (err: any) {
      console.log(`Failed ${m}: ${err.response?.status} - ${err.response?.data?.error?.message?.slice(0, 80)}`);
    }
  }
}

testAll();
