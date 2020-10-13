const fs = require('fs')
const csv = require('csv-parser');
const path = require('path')

const players = [];

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

async function postData() {
  return new Promise((resolve, reject) => {
  const file = path.join(process.cwd(), 'fantacovid.csv')
  return fs.createReadStream(file)
  .pipe(csv())
  .on('data', (row) => {
    players.push({name: capitalize(row[0]), covid: row[2], team: row[1]});
  })
  .on('end', () => resolve());
})
}

try {
  fs.readdirSync('cache')
} catch (e) {
  fs.mkdirSync('cache')
}

postData().then(posts => {
  fs.writeFile('cache/data.js', `export const posts = ${JSON.stringify(players)}`, function (err) {
  if (err) return console.log(err);
  console.log('Posts cached.');
})})