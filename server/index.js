import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import multer from 'multer';
import Tesseract from 'tesseract.js';
import fs from 'fs';

dotenv.config(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const dataURL = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    
    const { data: { text } } = await Tesseract.recognize(dataURL, 'eng');
    

    const lines = text.split("\n");
    let dataArray = [];
    for (const line of lines) {
      if (line.includes(":")) {
        const [key, value] = line.split(":", 2);
        dataArray.push({ Field: key.trim(), Value: value.trim() });
      } else if (/\d/.test(line) && !line.toLowerCase().startsWith("amount")) {

        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
          const key = parts.slice(0, parts.length - 1).join(" ");
          const value = parts[parts.length - 1];
          dataArray.push({ Field: key.trim(), Value: value.trim() });
        }
      }
    }
    
    let csvContent = "Field,Value\n";
    for (const row of dataArray) {
      csvContent += `"${row.Field}","${row.Value}"\n`;
    }
    
    const outputFile = "payslip_output.csv";
    fs.writeFileSync(outputFile, csvContent);
    
    res.json({
      message: "✅ CSV file saved as 'payslip_output.csv'",
      data: dataArray,
      csv: csvContent
    });
  } catch (error) {
    console.error("Error during OCR processing:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/powerbi/data', async (req, res) => {
  try {
    const token = process.env.POWERBI_ACCESS_TOKEN;
    if (!token) throw new Error("Power BI access token is not defined");
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get('https://api.powerbi.com/v1.0/myorg/datasets', config);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Power BI data:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
