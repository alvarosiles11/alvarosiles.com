package Server.SSSAbstract;

import java.security.cert.X509Certificate;

import org.json.JSONObject;

import Server.SSSInterface.SSSessionInterface;
import Servisofts.SConfig;
import _component._Manejador;

public abstract class SSSessionAbstract implements SSSessionInterface {

    private X509Certificate certClient;
    private String idSession;
    private String keyUsuario;
    private String keyDevice;

    private JSONObject usuario;
    private JSONObject servicio;
    private SSServerAbstract Server;

    private JSONObject pendiente;

    public SSSessionAbstract(Object session, String id, SSServerAbstract server) {
        this.idSession = id;
        this.Server = server;
        server.setSession(this);
    }

    public String getIdSession() {
        return idSession;
    }

    public void onOpen() {
        JSONObject data = new JSONObject();
        data.put("id", getIdSession());
        data.put("socket", SConfig.getJSON().getString("nombre"));
        data.put("component", "servicio");
        data.put("type", "init");
        data.put("data", "Bienvenido al servidor servisofts. Aganos el favor de identificarse.");
        send(data.toString());
    }

    public void setCertClient(X509Certificate certClient) {
        this.certClient = certClient;
    }

    public void setServicio(JSONObject servicio) {
        this.servicio = servicio;
    }

    public JSONObject getServicio() {
        return this.servicio;
    }

    public X509Certificate getCertClient() {
        return certClient;
    }

    public void onMenssage(JSONObject data) {
        data.put("id", getIdSession());
        data.put("noSend", false);
        // Router router = new Router(Router.TIPO_WS, this);
        if (this.servicio != null) {
            data.put("servicio", this.servicio);
        }
        String nombre = SConfig.getJSON().getString("nombre");
        if (data.has("_sincrone_key_" + nombre)) {
            String sincrone_key = data.getString("_sincrone_key_" + nombre);
            SSSincSend.mapa.get(sincrone_key).onMesagge(data);
        }
        data = _Manejador.factory(data, this);

        if (data.has("noSend")) {
            if (data.getBoolean("noSend")) {
                return;
            }
        }
        send(data.toString());

        // data.remove("noSend");

    }

    public void onClose(JSONObject data) {
        SSServerAbstract.closeSession(getIdSession());
    }

    public SSServerAbstract getServer() {
        return Server;
    }

    public String getKeyDevice() {
        return keyDevice;
    }

    public String getKeyUsuario() {
        return keyUsuario;
    }

    public void setUsuario(JSONObject usuario) {
        this.usuario = usuario;
    }

    public JSONObject getUsuario() {
        return usuario;
    }

    public void setKeyDevice(String keyDevice) {
        this.keyDevice = keyDevice;
        SSServerAbstract.setDeviceSession(keyDevice, getIdSession());
    }

    public void setKeyUsuario(String keyUsuario) {
        this.keyUsuario = keyUsuario;
        SSServerAbstract.setUserSession(keyUsuario, getKeyDevice());
    }

    public void setPendiente(String key, JSONObject pendiente) {
        if (this.pendiente == null) {
            this.pendiente = new JSONObject();
        }
        this.pendiente.put(key, pendiente);
    }

    public JSONObject getPendiente(String key) {
        if (this.pendiente == null) {
            return null;
        }
        return this.pendiente.getJSONObject(key);
    }

    @Override
    public JSONObject sendSync(JSONObject obj) {
        return new SSSincSend(this).send(obj);
    }

    @Override
    public JSONObject sendSync(JSONObject obj, int timeOut) {
        return new SSSincSend(this, timeOut).send(obj);
    }

}
