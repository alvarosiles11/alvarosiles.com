'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { NativeModules } from 'react-native';
var Sockets = NativeModules.TcpSockets;
import TcpSocket from './TcpSocket';
/**
 * @typedef {import('react-native').NativeEventEmitter} NativeEventEmitter
 */
var TcpServer = /** @class */ (function (_super) {
    __extends(TcpServer, _super);
    /**
     * @param {number} id
     * @param {NativeEventEmitter} eventEmitter
     * @param {(socket: TcpSocket) => void} connectionCallback
     */
    function TcpServer(id, eventEmitter, connectionCallback) {
        var _this = _super.call(this, id, eventEmitter) || this;
        _this.connectionCallback = connectionCallback;
        /** @type {TcpSocket[]} */
        _this._connections = [];
        _this._eventEmitter = eventEmitter;
        return _this;
    }
    /**
     * @override
     */
    TcpServer.prototype._registerEvents = function () {
        var _this = this;
        _super.prototype._registerEvents.call(this);
        this._connectionsListener = this._eventEmitter.addListener('connection', function (evt) {
            if (evt.id !== _this._id)
                return;
            _this._onConnection(evt.info);
            _this.emit('connection', evt.info);
        });
    };
    /**
     * @override
     */
    TcpServer.prototype._unregisterEvents = function () {
        var _a;
        _super.prototype._unregisterEvents.call(this);
        (_a = this._connectionsListener) === null || _a === void 0 ? void 0 : _a.remove();
    };
    /**
     * @param {{ port: number; host: string; reuseAddress?: boolean}} options
     * @param {(arg0: any) => void} [callback]
     * @returns {TcpServer}
     */
    TcpServer.prototype.listen = function (options, callback) {
        var gotOptions = __assign({}, options);
        gotOptions.host = gotOptions.host || '0.0.0.0';
        this.once('connect', function (ev) {
            if (callback)
                callback(ev.address);
        });
        Sockets.listen(this._id, gotOptions);
        return this;
    };
    /**
     * @param {(arg0: number) => void} callback
     */
    TcpServer.prototype.getConnections = function (callback) {
        callback(this._connections.length);
    };
    TcpServer.prototype.close = function () {
        this.destroy();
        this._connections.forEach(function (clientSocket) { return clientSocket.destroy(); });
    };
    /**
     * @private
     * @param {{ id: number; address: string; }} info
     */
    TcpServer.prototype._onConnection = function (info) {
        var socket = new TcpSocket(info.id, this._eventEmitter, info.address);
        this._connections.push(socket);
        this.connectionCallback(socket);
    };
    TcpServer.prototype.ref = function () {
        console.warn('react-native-tcp-socket: TcpServer.ref() method will have no effect.');
    };
    TcpServer.prototype.unref = function () {
        console.warn('react-native-tcp-socket: TcpServer.unref() method will have no effect.');
    };
    return TcpServer;
}(TcpSocket));
export default TcpServer;
