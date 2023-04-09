package Http;

public class Response {

    private String body;
    private int code;

    public Response() {
        this.body = "";
        this.code = HttpStatus.BAD_GATEWAY;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @Override
    public String toString() {
        return this.body;
    }

}
