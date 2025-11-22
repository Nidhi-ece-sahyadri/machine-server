const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve dashboard files publicly
app.use(express.static("public"));

/*
==========================================================
📌 ROUTE 1: Upload from MATLAB (RAW BINARY CSV)
==========================================================
*/
app.post("/live-csv", express.raw({ type: "*/*", limit: "10mb" }), (req, res) => {
    try {
        if (!req.body || req.body.length === 0) {
            return res.status(400).send("No file received");
        }

        fs.writeFileSync(path.join(__dirname, "public", "latest.csv"), req.body);

        console.log("📥 MATLAB uploaded latest.csv");
        res.json({ status: "OK" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

/*
==========================================================
📌 ROUTE 2: Manual upload (HTML form)
==========================================================
*/
app.post("/upload-csv", fileUpload(), (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send("No file received");
    }

    req.files.file.mv(path.join(__dirname, "public", "latest.csv"), (err) => {
        if (err) return res.status(500).send(err);

        console.log("📤 Manual upload saved");
        res.json({ message: "CSV uploaded" });
    });
});

// -------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
