package Http.Exception;

public class HttpCodeException extends Exception {

    private int code;

    public HttpCodeException(String message) {
        super(message);
    }


}
