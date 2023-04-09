package SocketCliente;

import java.util.HashMap;

import org.json.JSONObject;

import Servisofts.SConfig;
import Servisofts.SUtil;

public class SCSincroneSend {

    public static HashMap<String, SCSincroneSend> mapa = new HashMap<>();

    private String key;
    private SocketCliente cli;
    private JSONObject obj;

    private boolean isRun;
    private int timeOut;

    public SCSincroneSend(SocketCliente cli, int timeOut) {
        this.timeOut = timeOut;
        this.cli = cli;
        this.key = SUtil.uuid();

    }

    public SCSincroneSend(SocketCliente cli) {
        this.timeOut = 15000;
        this.cli = cli;
        this.key = SUtil.uuid();

    }

    public JSONObject send(JSONObject obj) {
        this.obj = obj;
        if (cli == null) {
            obj.put("estado", "error");
            obj.put("error", "No se encontro el cliente");
        } else {
            if (!cli.isOpen()) {
                obj.put("estado", "error");
                obj.put("error", "El cliente esta cerrado");
            }
        }

        String nombre = SConfig.getJSON().getString("nombre");
        obj.put("_sincrone_key_" + nombre, key);
        mapa.put(key, this);
        cli.send(obj.toString());
        isRun = true;
        while (isRun) {
            try {
                this.timeOut -= 100;
                if (this.timeOut <= 0) {
                    obj.put("estado", "error");
                    obj.put("error", "Tiempo de espera agotado");
                    isRun = false;
                }
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        this.obj.remove("_sincrone_key_" + nombre);
        mapa.remove(key);
        return this.obj;
    }

    public void onMesagge(JSONObject data) {
        // System.out.println("Response");
        // System.out.println(data.toString());
        this.obj = data;
        isRun = false;
        this.timeOut = 0;

    }
}
