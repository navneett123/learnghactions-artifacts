// app/index.js
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

if (process.argv.includes('--build')) {
  const content = `Test Build Report\nTimestamp: ${new Date().toISOString()}\n✅ Build Passed`;
  if (!fs.existsSync('build')) fs.mkdirSync('build');
  fs.writeFileSync('build/report.txt', content);
  console.log('Report generated!');
  process.exit(0); // Exit after build
}

// Web server for report view
app.get('/api/report', (req, res) => {
  if (fs.existsSync('./build/report.txt')) {
    const report = fs.readFileSync('./build/report.txt', 'utf-8');
    res.send(report);
  } else {
    res.status(404).send('Report not found');
  }
});



if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}


module.exports = app;