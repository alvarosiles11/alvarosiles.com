package SocketCliente;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;

import Servisofts.SConfig;
import Servisofts.SConsole;
import Servisofts.SLog;
// import component.ManejadorServicio;
// import util.console;
// import Config.Config;
import Servisofts.SSL;
import Servisofts.Servisofts;
import _component._servicio;
import netscape.javascript.JSObject;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;

public class SocketCliente extends Thread {

    public static HashMap<String, SocketCliente> Clientes = new HashMap<>();
    private static HashMap<String, JSONObject> ConexinesFallidas = new HashMap<>();
    private static HashMap<String, JSONObject> ConexinesFallidasNoSSL = new HashMap<>();

    public static JSONObject servicios_habilitados = new JSONObject();
    // Metodos Staticos globalizados

    public static void StartServicio(String nombre) {
        if (!servicios_habilitados.has(nombre)) {
            SConsole.error("No existe el servicio");
            return;
        }
        new Thread() {
            @Override
            public void run() {
                JSONObject servicio = servicios_habilitados.getJSONObject(nombre);
                if (!servicio.has("pem")) {
                    // SConsole.error("No existe el pem.");
                    JSONObject objSend = new JSONObject();
                    objSend.put("component", "servicio");
                    objSend.put("type", "getPem");
                    objSend.put("estado", "cargando");
                    objSend.put("key_servicio", servicio.getString("key"));
                    Clientes.get("servicio").send(objSend.toString());
                    // SConsole.error("Pidiendo SHA a servicios.");
                    // return;
                }
                JSONObject config = new JSONObject();
                config.put("ip", servicio.getString("ip"));
                config.put("puerto", servicio.getInt("puerto"));
                JSONObject cert = new JSONObject();
                cert.put("OU", servicio.getString("nombre"));
                config.put("cert", cert);
                Start(config);
            }
        }.start();

    }

    public static void Start(JSONObject config) {
        if (Servisofts.DEBUG) {
            SConsole.warning("**Conectando con 'servisofts." + config.getJSONObject("cert").getString("OU")
                    + "' Direccion: " + config.getString("ip") + ":" + config.getInt("puerto") + " **");
        }

        // CONFIGURAMNO EL CLIENTE SOCKET Y CORREMOS EL HILO
        try {
            SSLContext ss = SSL.getSSLContext();
            SSLSocketFactory ssf = ss.getSocketFactory();
            SSLSocket s;
            s = (SSLSocket) ssf.createSocket(config.getString("ip"), config.getInt("puerto"));
            s.startHandshake();
            // INICIA LA CONEXION AL SOCKET new SocketCliete(config);
            new SocketCliente(config, s);

        } catch (Exception e) {
            ConexinesFallidas.put(config.getJSONObject("cert").getString("OU"), config);
            SConsole.error(e.getMessage());
            SConsole.error(
                    "Error al conectar con el servidor 'servisofts." + config.getJSONObject("cert").getString("OU")
                            + "' Direccion: " + config.getString("ip") + ":" + config.getInt("puerto") + " **");
        }

    }

    public static void StartNoSSL(JSONObject config) {
        if (Servisofts.DEBUG) {
            SConsole.warning("**Conectando con 'servisofts." + config.getJSONObject("cert").getString("OU")
                    + "' Direccion: " + config.getString("ip") + ":" + config.getInt("puerto") + " **");
        }
        // CONFIGURAMNO EL CLIENTE SOCKET Y CORREMOS EL HILO
        try {
            // SSLContext ss = SSL.getSSLContext();
            // SSLSocketFactory ssf = ss.getSocketFactory();
            // SSLSocket s;
            // s = (SSLSocket) ssf.createSocket(config.getString("ip"),
            // config.getInt("puerto"));
            // s.startHandshake();
            config.put("noSSL", true);
            Socket s = new Socket(config.getString("ip"), config.getInt("puerto"));
            // INICIA LA CONEXION AL SOCKET new SocketCliete(config);
            new SocketCliente(config, s);

        } catch (Exception e) {
            ConexinesFallidasNoSSL.put(config.getJSONObject("cert").getString("OU"), config);
            SConsole.error(e.getMessage());
            SConsole.error(
                    "Error al conectar con el servidor 'servisofts." + config.getJSONObject("cert").getString("OU")
                            + "' Direccion: " + config.getString("ip") + ":" + config.getInt("puerto") + " **");
        }

    }

    private static Thread TReconnect;

    public static void enableReconect(boolean enable) {
        if (!enable) {
            if (TReconnect != null) {
                TReconnect = null;
            }
        } else {
            TReconnect = new Thread() {
                @Override
                public void run() {
                    while (TReconnect != null) {
                        try {
                            Collection<JSONObject> values = ConexinesFallidas.values();
                            ArrayList<JSONObject> listOfValues = new ArrayList<JSONObject>(values);
                            for (int i = 0; i < listOfValues.size(); i++) {
                                Start(ConexinesFallidas.get(listOfValues.get(i).getJSONObject("cert").getString("OU")));
                            }
                            Collection<JSONObject> values2 = ConexinesFallidasNoSSL.values();
                            ArrayList<JSONObject> listOfValues2 = new ArrayList<JSONObject>(values2);
                            for (int i = 0; i < listOfValues2.size(); i++) {
                                StartNoSSL(ConexinesFallidasNoSSL
                                        .get(listOfValues2.get(i).getJSONObject("cert").getString("OU")));
                            }

                            // Sleep metodh
                            if (SConfig.getJSON().has("socket_client")) {
                                Thread.sleep(SConfig.getJSON().getJSONObject("socket_client").getInt("reconectTime"));

                            } else {
                                Thread.sleep(5000);
                            }
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            };
            TReconnect.start();
        }
    }

    // Cliente Socket
    private boolean Open = false;
    private PrintWriter response;
    private BufferedReader request;
    public JSONObject config;

    public SocketCliente(JSONObject config, Socket socket) throws IOException {
        response = new PrintWriter(socket.getOutputStream(), true);
        request = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        this.config = config;
        // System.out.println("SocketCliete is Running...");
        Clientes.put(config.getJSONObject("cert").getString("OU"), this);
        ConexinesFallidasNoSSL.remove(config.getJSONObject("cert").getString("OU"));
        ConexinesFallidas.remove(config.getJSONObject("cert").getString("OU"));
        this.start();
        this.Open = true;
        // SConsole.succes("Socket Client ( " +
        // config.getJSONObject("cert").getString("OU") + " ) ready!");
    }

    @Override
    public void run() {
        try {
            String eventos;
            while (Open) {
                eventos = request.readLine();
                // System.out.println(eventos);
                onMesagge(eventos, config);
            }
        } catch (Exception ex) {
            onError(ex);
            if (config.has("noSSL")) {
                ConexinesFallidasNoSSL.put(config.getJSONObject("cert").getString("OU"), config);
            } else {
                ConexinesFallidas.put(config.getJSONObject("cert").getString("OU"), config);
            }
            this.Open = false;
        }
    }

    private void onError(Exception ex) {
        SConsole.error("Error:" + ex.getLocalizedMessage());
    }

    private void onMesagge(String msg, JSONObject config) {
        try {
            String nombre = SConfig.getJSON().getString("nombre");
            JSONObject data = new JSONObject(msg);
            data.put("info", config);
            if (data.has("_sincrone_key_" + nombre)) {
                String sincrone_key = data.getString("_sincrone_key_" + nombre);
                SCSincroneSend.mapa.get(sincrone_key).onMesagge(data);
            }
            switch (config.getJSONObject("cert").getString("OU")) {
                case "servicio":
                    switch (data.getString("component")) {
                        case "servicio":
                            new _servicio(data, null);
                            break;
                    }
                    break;
                default:
                    ManejadorCliente.onMessage(data, config);
            }

        } catch (Exception e) {
            if (e.getMessage() != null) {
                SConsole.error("ERROR: SocketCliente: OnMensaje: " + e.getMessage());
            } else {
                this.Open = false;
                SConsole.error("Session cliente close");
                String name = config.getJSONObject("cert").getString("OU");
                SLog.put("Servicios." + name + ".status", "desconectado");
                if (config.has("noSSL")) {
                    SocketCliente.ConexinesFallidasNoSSL.put(name, config);
                } else {
                    SocketCliente.ConexinesFallidas.put(name, config);
                }
            }

        }
    }

    public boolean isOpen() {
        return Open;
    }

    public void send(String data) {
        try {
            JSONObject datajson = new JSONObject(data);
            if (Servisofts.DEBUG) {
                SConsole.warning(
                        "[SocketClient:send] [" + config.getJSONObject("cert").getString("OU") + "]: component:"
                                + datajson.getString("component") + " type:" + datajson.getString("type"));
            }

        } catch (Exception e) {

        }
        response.println(data);
        response.flush();
    }

    public static void send(String server, String data) {
        Clientes.get(server).response.println(data);
        Clientes.get(server).response.flush();
    }

    public static JSONObject sendSinc(String server, JSONObject obj) {
        return new SCSincroneSend(Clientes.get(server)).send(obj);
    }

    public static JSONObject sendSinc(String server, JSONObject obj, int timeOut) {
        return new SCSincroneSend(Clientes.get(server), timeOut).send(obj);
    }

    public static void send(String server, JSONObject data, SSSessionAbstract session) {
        if (session != null) {
            data.put("id_session", session.getIdSession());
        }
        if (Clientes.get(server) == null) {
            SConsole.error("Error: SocketCliente: send: No existe el cliente: " + server);
            return;
        }
        Clientes.get(server).response.println(data);
        Clientes.get(server).response.flush();
    }

}