package Server.ServerSocket;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;
import Servisofts.SConsole;
import Servisofts.SSL;
import Server.SSSAbstract.SSServerAbstract;

public class ServerSocket extends SSServerAbstract {

    public ServerSocket(int puerto) {
        super(puerto, TIPO_SOCKET);
    }

    @Override
    public void Start(int puerto) {
        try {
            Thread t = new Thread() {
                @Override
                public void run() {
                    try {
                        SConsole.warning("Initializing SSLSocket on port ( " + getPuerto() + " )");
                        // printLog("Iniciando server...");
                        SSLContext ss = SSL.getSSLContext();
                        SSLServerSocketFactory ssf = ss.getServerSocketFactory();
                        SSLServerSocket s;
                        s = (SSLServerSocket) ssf.createServerSocket(getPuerto());
                        SConsole.succes("SSLSocket on port ( " + getPuerto() + " ) is ready!");
                        // printLog("Socket iniciado esperando conexion...");
                        while (true) {
                            SSLSocket socket = (SSLSocket) s.accept();
                            SessionSocket session = new SessionSocket(socket, ServerSocket.this);

                        }
                    } catch (Exception e) {
                        SConsole.error("Failed to initializing SSLSocket on port ( " + getPuerto() + " )");
                        e.printStackTrace();
                    }
                }
            };
            t.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void printLog(String mensaje) {
        SConsole.info(getTipoServer() + ": " + mensaje);
    }

}
