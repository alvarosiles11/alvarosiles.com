import { SSocketConfigProps } from "../..";
import SSession from '../index';

export default class SSClient {
    socket;
    props;
    SSession;
    url;
    constructor(props: SSocketConfigProps, SSession: SSession) {
        this.props = props;
        this.SSession = SSession;
        if (this.props.ssl) {
            this.url = "wss://" + this.props.host + "/ws/";
        } else {
            this.url = "ws://" + this.props.host + ":" + this.props.port.web + "/"
        }
    }
    isOpen() {
        if (!this.socket) return false;
        return this.socket.readyState === 1;
    }
    open() {
        if (this.isOpen()) {
            return;
        }
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => this.SSession.onOpen();
        this.socket.onclose = () => this.SSession.onClose();
        this.socket.onerror = (evt) => this.SSession.onError(evt);
        this.socket.onmessage = (evt) => {
            this.SSession.onMessage(evt.data)
        };

    }
    close() {
        this.socket.close();
        this.socket = null;
    }
    send(data) {
        if(!this.socket){
            return;
        }
        if(!this.isOpen)return;
        this.socket.send(data + "\n");
        // store.dispatch(obj);
    }

}