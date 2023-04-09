package ServerHttp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import org.jboss.com.sun.net.httpserver.HttpExchange;
import org.json.JSONObject;
import _component._Manejador;

public class Api {
    public static void POST(HttpExchange t) throws IOException {
        try {

            t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            t.getResponseHeaders().add("Access-Control-Allow-Headers", "*");

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(t.getRequestBody(), "UTF-8"));

            StringBuilder sb = new StringBuilder();
            // InputStream ios = t.getRequestBody();
            String i;
            while ((i = bufferedReader.readLine()) != null) {
                sb.append(i);
            }
            JSONObject request = new JSONObject(sb.toString());
            bufferedReader.close();
            request = _Manejador.factory(request, null);
            byte[] bs = request.toString().getBytes("UTF-8");
            t.sendResponseHeaders(200, bs.length);
            OutputStream os = t.getResponseBody();
            os.write(bs);
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
