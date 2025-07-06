const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

if (process.argv.includes('--build')) {
  const content = `✅ Build completed successfully!\nTimestamp: ${new Date().toISOString()}`;
  if (!fs.existsSync('./build')) fs.mkdirSync('./build');
  fs.writeFileSync('./build/report.txt', content);
  console.log('✅ Report generated at build/report.txt');
  process.exit(0);
}

app.get('/api/report', (req, res) => {
  const filePath = path.join(__dirname, '../build/report.txt');
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Report not found' });
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  res.json({ report: data });
});

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
