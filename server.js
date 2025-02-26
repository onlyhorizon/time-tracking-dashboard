const express = require('express');
const fs = require('fs'); // fs-Modul für das Einlesen der JSON-Datei
const path = require('path'); // Zum einfachen Umgang mit Dateipfaden
const app = express();
const cors = require('cors');

// CORS aktivieren (für alle Ursprünge)
app.use(cors());

// Statische Dateien bereitstellen (z. B. HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Startseite (index.html)
app.get('/', (req, res) => {
  // Serviere die index.html-Datei
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Die Route, die die JSON-Daten zurückgibt
app.get('/data.json', (req, res) => {
  // Datei einlesen und als JSON zurückgeben
  fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Fehler beim Einlesen der Datei:', err);
      res.status(500).send('Fehler beim Einlesen der Datei');
    } else {
      res.header('Content-Type', 'application/json');
      res.send(data);  // JSON-Daten zurückgeben
    }
  });
});

// Server starten
app.listen(8082, () => {
  console.log('Server läuft auf http://localhost:8082');
});