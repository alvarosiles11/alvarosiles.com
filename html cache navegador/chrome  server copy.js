const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/clear-chrome-history', (req, res) => {
  const chromeDataPath = path.join(
    process.env.LOCALAPPDATA,
    'Google',
    'Chrome',
    'User Data',
    'Default'
  );

  const filesToDelete = [
    'History',
    'Cookies',
    'Cache',
    'Login Data',
    'Visited Links'
  ];

  let errors = [];

  filesToDelete.forEach(file => {
    const filePath = path.join(chromeDataPath, file);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      errors.push(`Error al eliminar ${file}: ${error.message}`);
    }
  });

  if (errors.length > 0) {
    res.status(500).json({ error: errors.join(', ') });
  } else {
    res.status(200).json({ message: 'Historial de Google Chrome borrado exitosamente.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
