const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/clear-browser-history', (req, res) => {
  const { browser } = req.body;

  if (!browser) {
    return res.status(400).json({ error: 'El navegador es requerido.' });
  }

  let command = '';
  switch (browser) {
    case 'chrome':
      command = `RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 255`; // Chrome y Edge comparten el comando.
      break;
    case 'edge':
      command = `RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 255`;
      break;
    case 'firefox':
      command = `taskkill /IM firefox.exe /F && del /S /Q "%APPDATA%\\Mozilla\\Firefox\\Profiles\\*\\places.sqlite"`;
      break;
    case 'opera':
      command = `taskkill /IM opera.exe /F && del /S /Q "C:\\Users\\${process.env.USERNAME}\\AppData\\Roaming\\Opera Software\\Opera Stable\\History"`;
      break;
    case 'brave':
      command = `taskkill /IM brave.exe /F && del /S /Q "%LOCALAPPDATA%\\BraveSoftware\\Brave-Browser\\User Data\\Default\\History"`;
      break;
    default:
      return res.status(400).json({ error: 'Navegador no soportado.' });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el comando: ${stderr}`);
      return res.status(500).json({ error: `Error al borrar historial del navegador: ${browser}. Detalles: ${stderr}` });
    }
    res.status(200).json({ message: `Historial de ${browser} borrado exitosamente.` });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
