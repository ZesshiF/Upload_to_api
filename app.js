const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.route("/extract-text")
    .get((req, res) => {
        res.status(405).send("Method Not Allowed");
    })
    .post((req, res) => {
        if (!req.files || !req.files.pdfFile) {
            res.status(400).end();
            return;
        }

        pdfParse(req.files.pdfFile.data).then(result => {
            res.send(result.text);
        });
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
