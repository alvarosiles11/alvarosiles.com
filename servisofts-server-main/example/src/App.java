import java.io.IOException;
import java.security.KeyStoreException;
import java.security.cert.CertificateException;

import org.json.JSONArray;
import org.json.JSONException;

import Controller.exampleController;
import Controller.restauranteController;
import Servisofts.SConfig;
import Servisofts.SPGConect;
import Servisofts.Servisofts;
import Servisofts.http.Rest;

public class App {
    public static void main(String[] args) {
        Servisofts.DEBUG = true;

        // *** Para utilizar las variables de entorno del config.json ***

        Servisofts.initSConfig();
        // String nombre = SConfig.getJSON().getString("nombre");
        // System.out.println("Iniciando el example de nombre ("+nombre+")");

        // *** Para iniciar la conexion con la base de datos PostgreSQL 10+
        try {
            Servisofts.initSPGConect();

        } catch (Exception e) {
            e.printStackTrace();
        }

        // *** Para iniciar un REST API ***

        Rest.addController(exampleController.class);
        Rest.addController(restauranteController.class);
        Rest.start(8081);
    }
}
