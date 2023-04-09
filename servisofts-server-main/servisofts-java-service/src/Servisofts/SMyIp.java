package Servisofts;

import java.net.*;
import java.util.Enumeration;
import java.io.*;

public class SMyIp {
    public static String PUBLIC_IP = "";

    public static String getPublicIp() {
        if (PUBLIC_IP.equals("")) {
            BufferedReader in;
            try {
                URL whatismyip = new URL("http://checkip.amazonaws.com");
                in = new BufferedReader(new InputStreamReader(whatismyip.openStream()));
                String ip = in.readLine(); // you get the IP as a String
                PUBLIC_IP = ip;
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return PUBLIC_IP;

    }

    public static String getLocalIp() {
        return getLocalHostLANAddress();
    }

    private static String getLocalHostLANAddress() {
        String ip = "127.0.0.1";
        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            while (interfaces.hasMoreElements()) {
                NetworkInterface iface = interfaces.nextElement();
                // filters out 127.0.0.1 and inactive interfaces
                if (iface.isLoopback() || !iface.isUp())
                    continue;

                Enumeration<InetAddress> addresses = iface.getInetAddresses();
                while (addresses.hasMoreElements()) {
                    InetAddress addr = addresses.nextElement();

                    // *EDIT*
                    if (addr instanceof Inet6Address)
                        continue;

                    ip = addr.getHostAddress();
                }
            }
        } catch (SocketException e) {
            throw new RuntimeException(e);
        }
        return ip;

    }
}
