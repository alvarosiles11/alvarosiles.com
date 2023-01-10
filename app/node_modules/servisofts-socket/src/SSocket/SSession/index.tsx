import SSocket, { SSocketConfigProps } from "..";
import { SThread } from 'servisofts-component';
import SSClient from './SSClient/index';

export default class SSession {
    timePing = 10 * (1000); // time * (milliseconds)
    timeReconect = 2 * (1000); // time * (milliseconds)
    timeReintent = 5 * (1000); // time * (milliseconds)
    props;
    socket;
    ssocketInstance;
    identificado;
    identificarse;
    constructor(props: SSocketConfigProps) {
        this.props = props;
        // this.log("Instanciando el socket");
        // this.log("props", JSON.stringify(props, null, "\t"));
        this.socket = new SSClient(props, this);
    }
    isOpen() {
        if(!this.identificado) return false;
        return this.socket.isOpen();
    }
    init(instance) {
        // this.log("Init")
        this.ssocketInstance = instance;
        this.socket.open();
    }

    ping() {
        new SThread(this.timePing, "hiloSocket_ping_" + this.props.name, true).start(() => {
            if (!this.isOpen()) {
                return;
            }
            if (!this) return;
            if (!this.identificado) {
                if (!this.identificarse) return;
                this.identificarse();
            }
            this.socket.open();
            // this.log("ping");
            this.ping();
        })
    }
    reconect() {
        new SThread(this.timeReconect, "hiloSocket_reconect_" + this.props.name, true).start(() => {
            if (this.isOpen()) {
                return;
            }
            this.log("intentando reconectar...");
            this.socket.open();
            this.reconect();
        })
    }

    indentificarse() {
        if (!this.ssocketInstance.props) return;
        if (!this.ssocketInstance.props.identificarse) return;
        var prIdent = this.ssocketInstance.props.identificarse(this.ssocketInstance.props);
        var usr = false;
        var deviceKey = "deviceKey"
        var objSend = {
            component: "usuario",
            type: "identificacion",
            data: {},
            deviceKey: deviceKey,
            ...prIdent,
            estado: "cargando"
        };
        this.send(objSend);
    }

    reintent(obj) {
        if (typeof obj != 'object') {
            try {
                obj = JSON.parse(obj);
            } catch (e) {
                this.log("ERROR", "notifyRedux error al convertir el mensaje a JSON")
                return;
            }
        }
        new SThread(this.timeReintent, "hilo_reintent" + obj.component, true).start(() => {
            obj.estado = "";
            this.notifyRedux(obj);
        })
    }
    send(msn) {
        var str = msn;
        if (typeof msn == 'object') {
            str = JSON.stringify(msn);
        }
        if (!this.socket) {
            return;
        }
        if (!this.socket.send) return;

        this.socket.send(str);
        this.notifyRedux(str);
        this.reintent(str)
        return true;
    }
    onOpen() {
        this.ping();
        this.identificado = false;
        this.indentificarse();
        // this.log("onOpen");
    }
    onClose() {
        this.log("onClose");
        this.reconect();
        this.identificado = false;
    }
    onError(evt) {
        this.log("onError", JSON.stringify(evt));
    }

    mensajeTemp = "";

    notifyRedux(obj) {
        if (typeof obj != 'object') {
            try {
                obj = JSON.parse(obj);
            } catch (e) {
                console.log(e);
                this.log("ERROR", "notifyRedux error al convertir el mensaje a JSON")
                return;
            }
        }
        if (!this.ssocketInstance) {
            this.log("ERROR", "No hay ssocketInstance, No se pudo hacer dispatch del mensaje.")
            return;
        }

        this.ssocketInstance.props.dispatch(obj);

        return;
    }
    onMessage(msn) {
        this.mensajeTemp += msn
        if (/---SSofts---/.test(msn)) {
            this.mensajeTemp = this.mensajeTemp.replace(/---SSofts---/, '');
            var arr = this.mensajeTemp.split("---SSkey---");
            this.mensajeTemp = ""; // reset cola;
            var mensaje = arr[0]; //data
            var key = arr[1]; // SSkey
            this.log(mensaje);
            try {
                var obj = JSON.parse(mensaje);
                this.notifyRedux(obj);
                this.manejadorInterno(obj);
            } catch (e) {
                this.log("onMessage Error", e);
            }
        }
    }

    manejadorInterno(obj) {
        if (!obj.component) return;
        switch (obj.component) {
            case "usuario":
                switch (obj.type) {
                    case "identificacion":
                        if (obj.estado == "exito") {
                            this.identificado = true;
                            this.notifyRedux({
                                component: "usuario",
                                type: "identificacion",
                                estado: "exito"
                            });
                            // this.log("identificado con exito");
                            return;
                        }
                    default: return;
                }
            default: return;
        }
    }


    getTitle(color) {
        return `SSocket:\x1b[${color}m${this.props.name} < ${this.props.host} >\x1b[39m\n`;
    }
    log(...args) {
        console.log(this.getTitle(34), ...args)
        // if (!this.ssocketInstance) return;

        // var msn = this.props.name + ':';
        // for (var i = 0; i < arguments.length; i++) {
        //     msn += arguments[i];
        // }
        // this.ssocketInstance.state.log.push(msn);
        // this.ssocketInstance.setState({ log: this.ssocketInstance.state.log });

    }
}