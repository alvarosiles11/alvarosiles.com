package Model;

import com.google.gson.Gson;

public class Aeronave {
    private String key;

    public Aeronave(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
