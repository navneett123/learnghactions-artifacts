const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Test server for isolated testing
const app = express();

app.get('/api/report', (req, res) => {
  const filePath = path.join(__dirname, '../../build/report.txt');
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Report not found' });
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  res.json({ report: data });
});

describe('GET /api/report', () => {
  beforeAll(() => {
    const mockReport = '🧪 Test Build Report\nTimestamp: ' + new Date().toISOString();
    if (!fs.existsSync('./build')) fs.mkdirSync('./build');
    fs.writeFileSync('./build/report.txt', mockReport);
  });

  it('should return 200 and report content', async () => {
    const res = await request(app).get('/api/report');
    expect(res.statusCode).toBe(200);
    expect(res.body.report).toMatch(/Test Build Report/);
  });
});
