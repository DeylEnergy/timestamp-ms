const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/:typedDate', (req, res) => {
  const typedDate = req.params.typedDate;
  let timestamp = {};
  if (isNaN(typedDate)){
    timestamp.unix = new Date(typedDate).getTime() / 1000.0;
    timestamp.natural = typedDate;
  } else {
    let natural = new Date(parseInt(typedDate) * 1000);
    const monthName = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    timestamp.unix = parseInt(typedDate);
    timestamp.natural = monthName[natural.getMonth()] + ' ' +
                        natural.getDate() + ', ' + natural.getFullYear();
  }
  res.json(timestamp);
});

app.listen(3000);
