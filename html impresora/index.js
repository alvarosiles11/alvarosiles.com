const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;

// Ruta para abrir el Panel de Control
app.get('/open-control-panel', (req, res) => {
  exec('control', (err) => {
    if (err) {
      console.error('Error al abrir el Panel de Control:', err);
      res.status(500).send('Error al abrir el Panel de Control.');
      return;
    }
    res.send('Panel de Control abierto correctamente.');
  });
});

// Ruta para imprimir página de prueba
app.get('/print-test-page', (req, res) => {
  const printerName = req.query.printerName;
  const userName = "Rocio Nicol"; // Puedes obtener esto dinámicamente si es necesario

  if (!printerName) {
    res.status(400).send('El nombre de la impresora es obligatorio.');
    return;
  }

  const command = `powershell -Command "rundll32 printui.dll,PrintUIEntry /k /n '${printerName}'"`;

  exec(command, (err) => {
    if (err) {
      console.error('Error al imprimir la página de prueba:', err);
      res.status(500).send('Error al imprimir la página de prueba.');
      return;
    }
    res.send(`Página de prueba enviada correctamente a: ${printerName}`);
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get('/printer-settings', (req, res) => {
  const printerName = req.query.printerName;
  if (!printerName) {
    res.status(400).send('El nombre de la impresora es obligatorio.');
    return;
  }

  const command = `rundll32 printui.dll,PrintUIEntry /e /n "${printerName}"`;
  exec(command, (err) => {
    if (err) {
      console.error('Error al abrir la configuración de la impresora:', err);
      res.status(500).send('Error al abrir la configuración de la impresora.');
      return;
    }
    res.send(`Panel de configuración de la impresora abierto para: ${printerName}`);
  });
});