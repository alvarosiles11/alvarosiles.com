'use strict';
import { NativeEventEmitter, NativeModules } from 'react-native';
var Sockets = NativeModules.TcpSockets;
import Socket from './TcpSocket';
import Server from './TcpServer';
var TCPSockets = /** @class */ (function () {
    function TCPSockets() {
        this.instances = 0;
        this._eventEmitter = new NativeEventEmitter(Sockets);
    }
    /**
     * @param {(socket: Socket) => void} connectionListener
     * @returns {Server}
     */
    TCPSockets.prototype.createServer = function (connectionListener) {
        return new Server(this.instances++, this._eventEmitter, connectionListener);
    };
    /**
     * @param {import('./TcpSocket').ConnectionOptions} options
     * @param {() => void} callback
     * @returns {Socket}
     */
    TCPSockets.prototype.createConnection = function (options, callback) {
        var tcpSocket = new Socket(this.instances++, this._eventEmitter);
        return tcpSocket.connect(options, callback);
    };
    return TCPSockets;
}());
var tcpSockets = new TCPSockets();
export default tcpSockets;
