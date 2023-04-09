import Http.Rest;

public class App {

    public static void main(String[] args) throws Exception {

        Rest.addController(AeronaveApi.class);
        Rest.start();

    }

}
