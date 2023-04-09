package Http;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.HashMap;

import org.jboss.com.sun.net.httpserver.HttpServer;
import org.jboss.com.sun.net.httpserver.HttpContext;
import org.jboss.com.sun.net.httpserver.HttpExchange;

public abstract class Rest {

    private static HashMap<String, Controller> controllers = new HashMap<String, Controller>();

    public static void addController(Class RestController) {
        try {
            Controller controller = new Controller(RestController);
            if (controllers.containsKey(controller.getRoute())) {
                throw new RuntimeException("Controller duplicated: " + controller.getRoute() + "");
            }
            controllers.put(controller.getRoute(), controller);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void start() {
        start(80);
    }
    public static void start(int port) {
        HttpServer server;
        System.setProperty("org.eclipse.jetty.util.log.class", "org.eclipse.jetty.util.log.StdErrLog");
        System.setProperty("org.eclipse.jetty.LEVEL", "OFF");
        try {
            server = HttpServer.create(new InetSocketAddress(port), 0);
            HttpContext context = server.createContext("/");
            context.setHandler(Rest::RestHandler);
            server.start();
            System.out.println("Server started on port " + port);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private static void RestHandler(HttpExchange t) throws IOException {
        Response response = new Response();
        StringBuilder sb = new StringBuilder();
        InputStream ios = t.getRequestBody();
        int i;
        while ((i = ios.read()) != -1) {
            sb.append((char) i);
        }
        String data = sb.toString();
        onMessage(t, data, response);
        t.sendResponseHeaders(response.getCode(), response.toString().length());
        OutputStream os = t.getResponseBody();
        os.write(response.toString().getBytes());
        os.close();
    }

    private static void onMessage(HttpExchange t, String data, Response response) {
        String url = t.getRequestURI().toString();
        url = url.split("\\?")[0];
        Controller controller = null;
        for (String key : controllers.keySet()) {
            if (url.contains(key)) {
                controller = controllers.get(key);
                break;
            }
        }
        if (controller == null) {
            response.setCode(HttpStatus.BAD_GATEWAY);
            response.setBody("Controller not found");
            return;
        }
        controller.onMessage(t, data, response);
    }
}
