require('dotenv').config();
const express = require('express')
  , bodyParser = require('body-parser')
  , puppeteer = require('puppeteer')
  , cors = require('cors')
const path = require('path');

const app = new express();
app.use(bodyParser.json());
app.use(cors())

let dummyData = {
  1: {
    id: 1,
    name: "Luke",
    race: "Human",
    primary: "Thief",
    secondary: "Fighter",
    level: 2
  },
  2: {
    id: 2,
    name: "Martin",
    race: "Minotaur",
    primary: "Champion",
    secondary: "Assassin",
    level: 20
  },
  3: {
    id: 3,
    name: "Riley",
    race: "Changeling",
    primary: "Runegalder",
    secondary: "Runegalder",
    level: 5
  }
}
app.get('/api/view/:id', function(req, res){
  let {id} = req.params
  res.send(dummyData[id])
})

function getCharacterName(req, res) {
  return dummyData[req.params.id.split('.')[0]].name
}
app.get('/api/download/:id', async function (req, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/download/${req.params.id}`, {
    waitUntil: "networkidle2"
  });
  await page.waitForSelector('div#loaded')
  pdf = await page.pdf({
    format: "Letter",
    printBackground: true
  });
  res.set("Content-Disposition", `inline;filename=${getCharacterName(req, res)}.pdf`)
  res.send(pdf)
  await browser.close();
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });

app.listen(`4000`, async () => {
  console.log(`4000`);
});
