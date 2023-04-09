package Servisofts.http;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import org.jboss.com.sun.net.httpserver.HttpExchange;

public class Download {

  public static void handleRequest(HttpExchange exchange) throws IOException {
    exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");

    String ruta = "./";
    URI requestURI = exchange.getRequestURI();

    String[] paths = requestURI.getPath().split("/");
    for (int i = 0; i < paths.length; i++) {
      if (i > 0) {
        ruta += paths[i] + "/";
      }
    }
    ruta = ruta.substring(0, ruta.length() - 1);
    File file = new File(ruta);
    if (!file.exists()) {
      file = new File("");
    }
    byte[] bytearray = new byte[(int) file.length()];
    FileInputStream fis = new FileInputStream(file);
    BufferedInputStream bis = new BufferedInputStream(fis);
    bis.read(bytearray, 0, bytearray.length);
    exchange.sendResponseHeaders(200, file.length());
    OutputStream os = exchange.getResponseBody();
    os.write(bytearray, 0, bytearray.length);
    os.close();
  }
}
