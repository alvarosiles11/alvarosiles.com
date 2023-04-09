package Server.SSSAbstract;

import java.util.HashMap;

import org.json.JSONObject;

import Servisofts.SConfig;
import Servisofts.SUtil;

public class SSSincSend {

    public static HashMap<String, SSSincSend> mapa = new HashMap<>();

    private String key;
    private SSSessionAbstract cli;
    private JSONObject obj;

    private boolean isRun;
    private int timeOut;

    public SSSincSend(SSSessionAbstract cli) {
        this.timeOut = 15000;
        this.cli = cli;
        this.key = SUtil.uuid();

    }

    public SSSincSend(SSSessionAbstract cli, int timeout) {
        this.timeOut = timeout;
        this.cli = cli;
        this.key = SUtil.uuid();

    }

    public JSONObject send(JSONObject obj) {
        this.obj = obj;
        if (cli == null) {
            obj.put("estado", "error");
            obj.put("error", "No se encontro el cliente");
        }
        // if (!cli.isOpen()) {
        // obj.put("estado", "error");
        // obj.put("error", "El cliente esta cerrado");
        // }
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
        mapa.remove(key);
        return this.obj;
    }

    public void onMesagge(JSONObject data) {
        System.out.println("Response");
        this.obj = data;
        isRun = false;

    }
}
