import java.io.IOException;
import java.security.KeyStoreException;
import java.security.cert.CertificateException;

import org.json.JSONException;

import Controller.experienciaController;
import Controller.proyectoController;
import Controller.usuarioController;
import Servisofts.Servisofts;
import Servisofts.http.Rest;

class App {
    public static void main(String[] args) {
        Servisofts.DEBUG = true;

        // utilizar las variables de entorno del confg.json
        Servisofts.initSConfig();

        try {
            // conexion bd
            Servisofts.initSPGConect();
        } catch (KeyStoreException | JSONException | CertificateException | IOException e) {
            e.printStackTrace();
        }

        // api-rest usuario
        Rest.addController(usuarioController.class);
        Rest.addController(experienciaController.class);
        Rest.addController(proyectoController.class);

        // iniciar port 8081
        Rest.start(8081);
    }
}