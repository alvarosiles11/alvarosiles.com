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
import { EventEmitter } from 'events';
import { Buffer } from 'buffer';
var Sockets = NativeModules.TcpSockets;
var STATE = {
    DISCONNECTED: 0,
    CONNECTING: 1,
    CONNECTED: 2
};
/**
 * @typedef {"ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex"} BufferEncoding
 *
 * @typedef {import('react-native').NativeEventEmitter} NativeEventEmitter
 *
 * @typedef {{
 * port: number;
 * host?: string;
 * timeout?: number,
 * localAddress?: string,
 * localPort?: number,
 * interface?: 'wifi' | 'cellular' | 'ethernet',
 * reuseAddress?: boolean,
 * tls?: boolean,
 * tlsCheckValidity?: boolean,
 * tlsCert?: any,
 * }} ConnectionOptions
 */
var TcpSocket = /** @class */ (function (_super) {
    __extends(TcpSocket, _super);
    /**
     * Initialices a TcpSocket.
     *
     * @param {number} id
     * @param {NativeEventEmitter} eventEmitter
     * @param {string} [address]
     */
    function TcpSocket(id, eventEmitter, address) {
        var _this = _super.call(this) || this;
        /** @protected */
        _this._id = id;
        /** @protected */
        _this._eventEmitter = eventEmitter;
        /** @type {number} @private */
        _this._timeoutMsecs = 0;
        /** @private */
        _this._timeout = undefined;
        /** @type {number} @private */
        _this._state = STATE.DISCONNECTED;
        /** @private */
        _this._encoding = undefined;
        _this._registerEvents();
        if (address != undefined)
            _this._setConnected(address);
        return _this;
    }
    /**
     * @protected
     */
    TcpSocket.prototype._registerEvents = function () {
        var _this = this;
        this._unregisterEvents();
        this._dataListener = this._eventEmitter.addListener('data', function (evt) {
            if (evt.id !== _this._id)
                return;
            var bufferTest = Buffer.from(evt.data, 'base64');
            var finalData = _this._encoding ? bufferTest.toString(_this._encoding) : bufferTest;
            _this.emit('data', finalData);
        });
        this._errorListener = this._eventEmitter.addListener('error', function (evt) {
            if (evt.id !== _this._id)
                return;
            _this._onError();
            _this.emit('error', evt.error);
        });
        this._closeListener = this._eventEmitter.addListener('close', function (evt) {
            if (evt.id !== _this._id)
                return;
            _this._onClose();
            _this.emit('close', evt.error);
        });
        this._connectListener = this._eventEmitter.addListener('connect', function (evt) {
            if (evt.id !== _this._id)
                return;
            _this._onConnect(evt.address);
            _this.emit('connect', evt.address);
        });
    };
    /**
     * @protected
     */
    TcpSocket.prototype._unregisterEvents = function () {
        var _a, _b, _c, _d;
        (_a = this._dataListener) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = this._errorListener) === null || _b === void 0 ? void 0 : _b.remove();
        (_c = this._closeListener) === null || _c === void 0 ? void 0 : _c.remove();
        (_d = this._connectListener) === null || _d === void 0 ? void 0 : _d.remove();
    };
    /**
     * @param {ConnectionOptions} options
     * @param {() => void} [callback]
     */
    TcpSocket.prototype.connect = function (options, callback) {
        var customOptions = __assign({}, options);
        // Normalize args
        customOptions.host = customOptions.host || 'localhost';
        customOptions.port = Number(customOptions.port) || 0;
        this.once('connect', function (ev) {
            // console.log(ev);
            if (callback)
                callback();
        });
        // Timeout
        if (customOptions.timeout)
            this.setTimeout(customOptions.timeout);
        else if (this._timeout)
            this._activateTimer();
        // TLS Cert
        if (customOptions.tlsCert) {
            customOptions.tlsCert = customOptions.tlsCert;
        }
        // console.log(getAndroidResourceIdentifier(customOptions.tlsCert));
        this._state = STATE.CONNECTING;
        this._destroyed = false;
        Sockets.connect(this._id, customOptions.host, customOptions.port, customOptions);
        return this;
    };
    /**
     * Sets the socket to timeout after `timeout` milliseconds of inactivity on the socket. By default `TcpSocket` do not have a timeout.
     *
     * When an idle timeout is triggered the socket will receive a `'timeout'` event but the connection will not be severed.
     * The user must manually call `socket.end()` or `socket.destroy()` to end the connection.
     *
     * If `timeout` is 0, then the existing idle timeout is disabled.
     *
     * The optional `callback` parameter will be added as a one-time listener for the `'timeout'` event.
     *
     * @param {number} timeout
     * @param {() => void} [callback]
     */
    TcpSocket.prototype.setTimeout = function (timeout, callback) {
        if (timeout === 0) {
            this._clearTimeout();
        }
        else {
            this._activateTimer(timeout);
        }
        if (callback)
            this.once('timeout', callback);
        return this;
    };
    /**
     * @private
     * @param {number} [timeout]
     */
    TcpSocket.prototype._activateTimer = function (timeout) {
        var _this = this;
        if (timeout !== undefined)
            this._timeoutMsecs = timeout;
        this._clearTimeout();
        this._timeout = setTimeout(function () {
            _this._clearTimeout();
            _this.emit('timeout');
        }, this._timeoutMsecs);
    };
    /**
     * @private
     */
    TcpSocket.prototype._clearTimeout = function () {
        if (this._timeout !== undefined) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
    };
    /**
     * Set the encoding for the socket as a Readable Stream. By default, no encoding is assigned and stream data will be returned as `Buffer` objects.
     * Setting an encoding causes the stream data to be returned as strings of the specified encoding rather than as Buffer objects.
     *
     * For instance, calling `socket.setEncoding('utf8')` will cause the output data to be interpreted as UTF-8 data, and passed as strings.
     * Calling `socket.setEncoding('hex')` will cause the data to be encoded in hexadecimal string format.
     *
     * @param {BufferEncoding} [encoding]
     */
    TcpSocket.prototype.setEncoding = function (encoding) {
        this._encoding = encoding;
        return this;
    };
    /**
     * Enable/disable the use of Nagle's algorithm. When a TCP connection is created, it will have Nagle's algorithm enabled.
     *
     * Nagle's algorithm delays data before it is sent via the network. It attempts to optimize throughput at the expense of latency.
     *
     * Passing `true` for `noDelay` or not passing an argument will disable Nagle's algorithm for the socket. Passing false for noDelay will enable Nagle's algorithm.
     *
     * @param {boolean} noDelay Default: `true`
     */
    TcpSocket.prototype.setNoDelay = function (noDelay) {
        var _this = this;
        if (noDelay === void 0) { noDelay = true; }
        if (this._state != STATE.CONNECTED) {
            this.once('connect', function () { return _this.setNoDelay(noDelay); });
            return this;
        }
        Sockets.setNoDelay(this._id, noDelay);
        return this;
    };
    /**
     * Enable/disable keep-alive functionality, and optionally set the initial delay before the first keepalive probe is sent on an idle socket.
     *
     * `initialDelay` is ignored.
     *
     * @param {boolean} enable Default: `false`
     * @param {number} initialDelay ***IGNORED**. Default: `0`
     */
    TcpSocket.prototype.setKeepAlive = function (enable, initialDelay) {
        var _this = this;
        if (enable === void 0) { enable = false; }
        if (initialDelay === void 0) { initialDelay = 0; }
        if (this._state != STATE.CONNECTED) {
            this.once('connect', function () { return _this.setKeepAlive(enable, initialDelay); });
            return this;
        }
        if (initialDelay !== 0) {
            console.warn('react-native-tcp-socket: initialDelay param in socket.setKeepAlive() is ignored');
        }
        Sockets.setKeepAlive(this._id, enable, Math.floor(initialDelay));
        return this;
    };
    TcpSocket.prototype.address = function () {
        return this._address;
    };
    /**
     * @param {string | Buffer | Uint8Array} data
     * @param {BufferEncoding} [encoding]
     */
    TcpSocket.prototype.end = function (data, encoding) {
        var _this = this;
        if (this._destroyed)
            return;
        if (data) {
            this.write(data, encoding, function () {
                _this._destroyed = true;
                Sockets.end(_this._id);
            });
        }
        else {
            this._destroyed = true;
            this._clearTimeout();
            Sockets.end(this._id);
        }
    };
    TcpSocket.prototype.destroy = function () {
        if (!this._destroyed) {
            this._destroyed = true;
            this._clearTimeout();
            Sockets.destroy(this._id);
        }
    };
    /**
     * @private
     * @param {string} address
     */
    TcpSocket.prototype._onConnect = function (address) {
        this._setConnected(address);
    };
    /**
     * @private
     */
    TcpSocket.prototype._onClose = function () {
        this._setDisconnected();
    };
    /**
     * @private
     */
    TcpSocket.prototype._onError = function () {
        this.destroy();
    };
    /**
     * Sends data on the socket. The second parameter specifies the encoding in the case of a string — it defaults to UTF8 encoding.
     *
     * The optional callback parameter will be executed when the data is finally written out, which may not be immediately.
     *
     * @param {string | Buffer | Uint8Array} buffer
     * @param {BufferEncoding} [encoding]
     * @param {(error: string | null) => void} [callback]
     */
    TcpSocket.prototype.write = function (buffer, encoding, callback) {
        var self = this;
        if (this._state === STATE.DISCONNECTED)
            throw new Error('Socket is not connected.');
        callback = callback || (function () { });
        var generatedBuffer = this._generateSendBuffer(buffer, encoding);
        Sockets.write(this._id, generatedBuffer.toString('base64'), 
        /**
         * @param {string} err
         */
        function (err) {
            if (self._timeout)
                self._activateTimer();
            if (callback) {
                if (err)
                    return callback(err);
                callback(null);
            }
        });
    };
    /**
     * @private
     * @param {string | Buffer | Uint8Array} buffer
     * @param {BufferEncoding} [encoding]
     */
    TcpSocket.prototype._generateSendBuffer = function (buffer, encoding) {
        if (typeof buffer === 'string') {
            return Buffer.from(buffer, encoding);
        }
        else if (Buffer.isBuffer(buffer)) {
            return buffer;
        }
        else if (buffer instanceof Uint8Array || Array.isArray(buffer)) {
            return Buffer.from(buffer);
        }
        else {
            throw new TypeError("Invalid data, chunk must be a string or buffer, not " + typeof buffer);
        }
    };
    /**
     * @private
     * @param {string} address
     */
    TcpSocket.prototype._setConnected = function (address) {
        this._state = STATE.CONNECTED;
        this._address = address;
    };
    /**
     * @private
     */
    TcpSocket.prototype._setDisconnected = function () {
        if (this._state === STATE.DISCONNECTED)
            return;
        this._unregisterEvents();
        this._state = STATE.DISCONNECTED;
    };
    TcpSocket.prototype.ref = function () {
        console.warn('react-native-tcp-socket: TcpSocket.ref() method will have no effect.');
    };
    TcpSocket.prototype.unref = function () {
        console.warn('react-native-tcp-socket: TcpSocket.unref() method will have no effect.');
    };
    return TcpSocket;
}(EventEmitter));
export default TcpSocket;
