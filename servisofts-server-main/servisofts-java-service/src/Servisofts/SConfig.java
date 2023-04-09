package Servisofts;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.json.JSONObject;

public class SConfig {
    private static JSONObject config = null;
    public static String configFile = "config.json";

    public static boolean validate() {
        JSONObject obj = getJSON();
        if (obj != null) {
            if (!obj.has("nombre")) {
                SConsole.error("Parameter ( nombre ) type String not found.");
                return false;
            }
            if (!obj.has("ss")) {
                SConsole.error("Parameter ( ss ) type String not found.");
                return false;
            }
            if (!obj.has("ssl")) {
                SConsole.error("Parameter ( ssl ) type { nombre_jks, pass_jks, cert } not found.");
                return false;
            } else {
                JSONObject ssl = obj.getJSONObject("ssl");
                if (!ssl.has("nombre_jks")) {
                    SConsole.error("Parameter ( nombre_jks ) type String not found.");
                    return false;
                }
                if (!ssl.has("pass_jks")) {
                    SConsole.error("Parameter ( pass_jks ) type String not found.");
                    return false;
                }
                if (!ssl.has("cert")) {
                    SConsole.error("Parameter ( cert ) type String not found.");
                    return false;
                }
                String OU = ssl.getJSONObject("cert").getString("OU");
                if (OU == null || OU.isEmpty()) {
                    SConsole.error("Parameter ( ssl/cert/OU ) type String not found.");
                    return false;
                }
                if (!OU.equals("servicio")) {
                    if (!obj.has("socket_client")) {
                        SConsole.error("Parameter ( socket_client ) type { servicio, reconectTime } not found.");
                        return false;
                    }
                    if (!obj.getJSONObject("socket_client").has("servicio")) {
                        SConsole.error("Parameter ( socket_client/servicio ) type { puerto, ip, cert } not found.");
                        return false;
                    }
                    if (!obj.getJSONObject("socket_client").getJSONObject("servicio").has("cert")) {
                        SConsole.error("Parameter ( socket_client/servicio/cert ) type { OU, pem } not found.");
                        return false;
                    }
                }
            }
            if (!obj.has("data_base")) {
                SConsole.error("Parameter ( data_base ) type { bd_name, ip, puerto, user, pass } not found.");
                return false;
            }
            return true;
        }
        return false;

    }

    public static JSONObject getJSON() {
        try {
            if (config == null) {

                FileReader file;
                file = new FileReader(configFile);
                int valor = file.read();
                String configJson = "";
                while (valor != -1) {
                    configJson = configJson + String.valueOf(((char) valor));
                    valor = file.read();
                    // System.out.print(".");
                }
                config = new JSONObject(configJson);
            }
        } catch (Exception e) {
            return null;
        }
        return config;
    }

    public static JSONObject getJSON(String key) {

        return getJSON().getJSONObject(key);
    }
}
