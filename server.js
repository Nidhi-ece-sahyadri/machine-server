const express = require('express');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

// Enable CORS (needed for browser + MATLAB)
app.use(cors());

// Serve static files (HTML + latest.csv)
app.use(express.static('public'));

// -----------------------
// MATLAB Upload Endpoint
// -----------------------
app.post('/live-csv',
    express.raw({ type: '*/*', limit: '20mb' }),
    (req, res) => {

        if (!req.body || req.body.length === 0) {
            return res.status(400).send('No CSV received');
        }

        const filePath = path.join(__dirname, 'public', 'latest.csv');
        fs.writeFileSync(filePath, req.body);

        console.log('📥 latest.csv UPDATED at ' + new Date().toLocaleTimeString());
        res.json({ status: "OK" });
    }
);

// -----------------------
// OPTIONAL: Manual upload
// -----------------------
app.post('/upload-csv', fileUpload(), (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send('No file uploaded');
    }

    req.files.file.mv(path.join(__dirname, 'public', 'latest.csv'), err => {
        if (err) return res.status(500).send(err);
        console.log("📤 Manual CSV uploaded");
        res.json({ message: "CSV Uploaded" });
    });
});

// -----------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
);
