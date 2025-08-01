const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/assign', (req, res) => {
  const assignment = req.body;
  const filePath = './assignments.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    const assignments = err ? [] : JSON.parse(data || '[]');
    assignments.push(assignment);

    fs.writeFile(filePath, JSON.stringify(assignments, null, 2), err => {
      if (err) {
        console.error('Failed to save assignment:', err);
        return res.status(500).send('Error saving assignment');
      }
      res.send('Assignment saved');
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running...');
});