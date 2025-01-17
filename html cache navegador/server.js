const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Ruta para servir el archivo HTML
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para borrar el historial de Brave
app.post('/clear-brave-history', (req, res) => {
  const braveProfilePath = 'C:\\Users\\Alvaro\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data\\Default';  // Cambia esta ruta si es diferente

  // Comando para borrar el historial de Brave
  const deleteHistoryCommand = `del /f /q "${braveProfilePath}\\History"`;  // Elimina el archivo de historial

  exec(deleteHistoryCommand, (err, stdout, stderr) => {
    if (err) {
      console.error('Error al borrar el historial de Brave:', err);
      return res.json({ success: false, error: err.message });
    }
    console.log('Historial de Brave borrado.');
    res.json({ success: true });
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
