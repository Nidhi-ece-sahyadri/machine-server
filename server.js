const express = require('express');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();

// Serve static files from 'public' folder
app.use(express.static('public'));

// ------------------------
// Route: Accept CSV upload from MATLAB
// ------------------------
app.post('/live-csv', express.raw({ type: '*/*', limit: '10mb' }), (req, res) => {
    if (!req.body || req.body.length === 0) return res.status(400).send('No data');

    fs.writeFileSync(path.join(__dirname, 'public', 'latest.csv'), req.body);
    console.log('📥 CSV received and saved');
    res.json({ status: 'OK' });
});

// ------------------------
// Optional: Manual upload via HTML form
// ------------------------
app.post('/upload-csv', fileUpload(), (req, res) => {
    if (!req.files || !req.files.file) return res.status(400).send('No file received');

    req.files.file.mv(path.join(__dirname, 'public', 'latest.csv'), (err) => {
        if (err) return res.status(500).send(err);
        console.log('📤 Manual upload saved');
        res.json({ message: 'CSV uploaded' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
