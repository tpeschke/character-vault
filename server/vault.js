require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , puppeteer = require('puppeteer')
    , cors = require('cors')
const path = require('path');

const app = new express();
app.use(bodyParser.json());
app.use(cors())

app.get('/*.pdf', async function (req, res) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/download/character", {
     waitUntil: "networkidle2"
    });
    pdf = await page.pdf({
     format: "Letter",
     printBackground: true
    });
    res.send(pdf)
    await browser.close();
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });

app.listen(`4000`, async () => {
  console.log(`4000`);
});
