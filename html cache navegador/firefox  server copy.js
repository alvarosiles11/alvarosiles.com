const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Función para borrar historial de Google Chrome
const deleteChromeHistory = () => {
  const chromeHistoryPath = path.join(
    process.env.LOCALAPPDATA,
    'Google\\Chrome\\User Data\\Default\\History'
  );
  if (fs.existsSync(chromeHistoryPath)) {
    fs.unlinkSync(chromeHistoryPath);
    return 'Historial de Chrome eliminado';
  } else {
    return 'No se encontró el historial de Chrome';
  }
};

// Función para borrar historial de Firefox
const deleteFirefoxHistory = () => {
  const firefoxProfilePath = path.join(
    process.env.APPDATA,
    'Mozilla\\Firefox\\Profiles'
  );
  const profileDirs = fs.readdirSync(firefoxProfilePath);
  for (let dir of profileDirs) {
    const historyPath = path.join(firefoxProfilePath, dir, 'places.sqlite');
    if (fs.existsSync(historyPath)) {
      fs.unlinkSync(historyPath);
      return 'Historial de Firefox eliminado';
    }
  }
  return 'No se encontró el historial de Firefox';
};

// Función para borrar historial de Opera
const deleteOperaHistory = () => {
  const operaHistoryPath = path.join(
    process.env.LOCALAPPDATA,
    'Programs\\Opera\\Opera\\User Data\\Default\\History'
  );
  if (fs.existsSync(operaHistoryPath)) {
    fs.unlinkSync(operaHistoryPath);
    return 'Historial de Opera eliminado';
  } else {
    return 'No se encontró el historial de Opera';
  }
};

// Función para borrar historial de Brave
const deleteBraveHistory = () => {
  const braveHistoryPath = path.join(
    process.env.LOCALAPPDATA,
    'BraveSoftware\\Brave-Browser\\User Data\\Default\\History'
  );
  if (fs.existsSync(braveHistoryPath)) {
    fs.unlinkSync(braveHistoryPath);
    return 'Historial de Brave eliminado';
  } else {
    return 'No se encontró el historial de Brave';
  }
};

// Ruta para borrar el historial de todos los navegadores
app.get('/clear-history', (req, res) => {
  try {
    const chromeMessage = deleteChromeHistory();
    const firefoxMessage = deleteFirefoxHistory();
    const operaMessage = deleteOperaHistory();
    const braveMessage = deleteBraveHistory();

    res.send({
      chrome: chromeMessage,
      firefox: firefoxMessage,
      opera: operaMessage,
      brave: braveMessage,
    });
  } catch (error) {
    res.status(500).send({ error: 'Error al borrar los datos: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
