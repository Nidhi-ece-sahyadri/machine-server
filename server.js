const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve dashboard static files from /public
app.use(express.static('public'));

// Middleware to parse raw text (CSV) from MATLAB
app.use(express.text({ type: 'text/*' }));

// POST route to accept CSV uploads
app.post('/live-csv', (req, res) => {
    try {
        const csvData = req.body;  // MATLAB sends raw CSV text here
        fs.writeFileSync(path.join(__dirname, 'public', 'latest_data.csv'), csvData);
        console.log('✅ CSV received and saved.');
        res.status(200).send('CSV received!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Upload failed');
    }
});

// GET route to fetch latest CSV (optional for front-end polling)
app.get('/latest-data', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'latest_data.csv');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('No data yet');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
